const express = require('express')
const AuthController = require('./auth/AuthController');
const ServerController = require('./server/ServerController');
const cors = require('cors');

// Config für express app
const app = express()
const port = 3001
const router = express.Router();

// json parser setzten
app.use(express.json());
// cors erlauben
app.use(cors());
// default rounting setzten
app.use('/', router);

// Auth
router.post('/auth/signup', AuthController.signup);
router.post('/auth/signin', AuthController.signin);
router.get('/auth/validate-token', AuthController.validateToken);

// Server
router.post('/server', ServerController.createServer)
router.get('/server', ServerController.getServers)
router.delete('/server/:id', ServerController.deleteServer)

// den konfigurierten router setzten
module.exports = router;

app.listen(port, () => {
    console.log(`xServer backend listening on port ${port}`)
})
