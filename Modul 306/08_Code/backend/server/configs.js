// Returns Deployment Object for a Minecraft Kubernetes Deployment
function getMinecraftDeployment(id) {
    return {
        apiVersion: 'apps/v1',
        kind: 'Deployment',
        metadata: {
            name: id,
            namespace: 'gameserver'
        },
        spec: {
            replicas: 1,
            selector: {
                matchLabels: {
                    app: id
                }
            },
            template: {
                metadata: {
                    labels: {
                        app: id
                    }
                },
                spec: {
                    containers: [{
                        name: id,
                        image: 'itzg/minecraft-server:2024.5.0-java17-jdk',
                        env: [{
                            name: 'EULA',
                            value: 'TRUE'
                        },
                            {
                                name: "VERSION",
                                value: "1.20.4"
                            }],
                        ports: [{
                            containerPort: 25565
                        }]
                    }]
                }
            }
        }
    };
}

// Returns Service Object for a Minecraft Kubernetes Service
function getMinecraftService(id) {
    return {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
            name: id,
            namespace: 'gameserver'
        },
        spec: {
            selector: {
                app: id
            },
            ports: [{
                protocol: 'TCP',
                port: 25565,
                targetPort: 25565
            }],
            type: 'NodePort'
        }
    };
}

// Die beiden obenstehenden Funktionen exportieren um in anderen Files zu nutzen
module.exports = {getMinecraftDeployment, getMinecraftService};
