const {authenticateToken} = require("./../auth/AuthController");
const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
const dotenv = require("dotenv");
const {getMinecraftDeployment, getMinecraftService} = require("./configs");
const {MongoClient} = require("mongodb");
const {v4: uuidv4} = require('uuid');
// Env Variablen konfigurieren
dotenv.config({
    path: `./env/.env.${process.env.NODE_ENV || 'development'}`
});
const mongoUri = process.env.MONGO_URI;
const env = process.env.ENVIRONMENT;

// Kubernetes-Schnittstelle konfigurieren
kc.loadFromDefault();
const k8sAppsV1Api = kc.makeApiClient(k8s.AppsV1Api);
const k8sCoreV1Api = kc.makeApiClient(k8s.CoreV1Api);

// Exportierte Methode um einem Server zu erstellen
exports.createServer = [
    // Middleware um user aus Token auszulesen und Token zu validieren
    authenticateToken,
    async (req, res) => {
        const {name, game} = req.body;
        // todo validate server
        // validierung da noch kein Zahlungssystem
        if (name !== "TEST" || game !== "MINECRAFT") {
            return res.status(400).json({error: 'Wrong config for server'});
        }
        // mc+ da services buchstaben am anfang des namens haben müssen
        const serverId = 'mc-' + uuidv4();
        try {
            // mongodb connection aufbauen und den current user auslesen
            const client = await MongoClient.connect(mongoUri);
            const db = client.db('mongo-db');
            const currentUser = await db.collection('user').findOne({email: req.user.email})
            if (!currentUser) {
                return res.status(400).json({error: 'User does not exist'});
            }
            // neuer server anlegen und in db speichern
            const newServer = {
                _id: serverId,
                name,
                game,
                url: serverId + ".xserver.space",
                userId: currentUser._id,
                nodePort: 42069
            };
            await db.collection('server').insertOne(newServer);

            await client.close();
        } catch (error) {
            res.status(500).json({error: 'Failed to create server'});
        }

        // Falls env === prod ist werden die kubernetesdeployments des erstellten Servers erstellt.
        if (env === "prod") {
            try {
                await createDeployment('gameserver', getMinecraftDeployment(serverId));
                await createService('gameserver', getMinecraftService(serverId));

                const nodePort = await getServiceNodePort('gameserver', serverId);

                // Update the server in the database with the NodePort
                const client = await MongoClient.connect(mongoUri);
                const db = client.db('mongo-db');
                await db.collection('server').updateOne(
                    { _id: serverId },
                    { $set: { nodePort: nodePort } }
                );
                await client.close();

            } catch (err) {
                return res.status(500).send('Failed to deploy server');
            }
            return res.status(201).json({message: 'Server created successfully'});
        } else {
            // Fall nicht prod env wird der server nur in der DB erstellt und nicht als resourcen da dies sonst zu teuer wird.
            return res.status(410).json({error: 'Server in db created but not playable due to test env'});
        }

    }
];

// Methode um alle Server des current users
exports.getServers = [
    // Middleware um user aus Token auszulesen und Token zu validieren
    authenticateToken,
    async (req, res) => {
        try {
            // mongodb connection aufbauen und den current user auslesen
            const client = await MongoClient.connect(mongoUri);
            const db = client.db('mongo-db');
            const currentUser = await db.collection('user').findOne({email: req.user.email})
            if (!currentUser) {
                return res.status(400).json({error: 'User does not exist'});
            }
            // alle server des users auslesen
            const servers = await db.collection('server').find({userId: currentUser._id}).toArray();
            await client.close();
            return res.status(200).json(servers);
        } catch (error) {
            return res.status(500).json({error: 'Failed to fetch servers'});
        }
    }
];

// Methode um eines server des current users zu löschen
exports.deleteServer = [
    // Middleware um user aus Token auszulesen und Token zu validieren
    authenticateToken,
    async (req, res) => {
        // server id aus pathparams auslesen
        const serverId = req.params.id;
        try {
            // mongodb connection aufbauen und den current user auslesen
            const client = await MongoClient.connect(mongoUri);
            const db = client.db('mongo-db');
            const currentUser = await db.collection('user').findOne({email: req.user.email})
            if (!currentUser) {
                return res.status(400).json({error: 'User does not exist'});
            }
            // server löschen aber nur mit der id des suers und der server id damit man keine fremden server löschen kann
            const result = await db.collection('server').findOneAndDelete({userId: currentUser._id, _id: serverId});
            await client.close();
            // falls nichts gelöscht wurde gibt es einen fehler
            if (!result?._id){
                return res.status(400).json({error: 'Failed to delete server: server does not exist or not belong to you'});
            }
            // Falls env === prod lösche die kubernetes deployements und services
            if (result?._id && env === "prod") {
                try {
                    await deleteDeployment('gameserver', serverId);
                    await deleteService('gameserver', serverId);
                } catch (err) {
                    return res.status(500).json({error: 'Failed to delete Kubernetes resources'});
                }
            }

            return res.status(204).json({message: "Deleted server successfully"});
        } catch (error) {
            return res.status(500).json({error: 'Failed to delete server'});
        }
    }
];

async function getServiceNodePort(namespace, serviceName) {
    try {
        const res = await k8sCoreV1Api.readNamespacedService(serviceName, namespace);
        return res.body.spec.ports[0].nodePort;
    } catch (err) {
        console.error('Error getting service node port:', err);
    }
}

// Methode um das kubernetes deployment zu deployen
async function createDeployment(namespace, deploymentManifest) {
    try {
        await k8sAppsV1Api.createNamespacedDeployment(namespace, deploymentManifest);
    } catch (err) {
        console.error('Error creating deployment:', err);
    }
}

// Methode um den kubernetes service zu deployen
async function createService(namespace, serviceManifest) {
    try {
        await k8sCoreV1Api.createNamespacedService(namespace, serviceManifest);
    } catch (err) {
        console.error('Error creating service:', err);
    }
}

// Methode um das kubernetes deployment zu löschen
async function deleteDeployment(namespace, deploymentName) {
    try {
        await k8sAppsV1Api.deleteNamespacedDeployment(deploymentName, namespace);
    } catch (err) {
        console.error('Error deleting deployment:', err);
    }
}

// Methode um den kubernetes service zu löschen
async function deleteService(namespace, serviceName) {
    try {
        await k8sCoreV1Api.deleteNamespacedService(serviceName, namespace);
    } catch (err) {
        console.error('Error deleting service:', err);
    }
}
