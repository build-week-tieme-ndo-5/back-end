require('dotenv').config();
const express = require('express')

const staffRouter = require('./staff/staff-router.js')
const clientsRouter = require('./clients/clients-router.js')

const server = express();

server.use(express.json());

server.use('/staff', staffRouter);
server.use('/clients', clientsRouter)

server.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Tieme-Ndo'
    })
})

const port = process.env.PORT || 6000;

if(!module.parent) {
    server.listen(port, () => console.log(`Server listening on port ${port}`))
}

module.exports = server;