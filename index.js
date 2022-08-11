const axios = require('axios');
const https = require('https');
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
})
axios.defaults.httpsAgent = httpsAgent //sacar para prod o poner que lea de ENV el ambiente

const Server=require('./src/models/Server');
const dotenv = require('dotenv');
const server = new Server();

server.listen();

//Arrancar api: npm run serve