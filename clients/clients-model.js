const db = require('../data/db.js');

function getClients() {
    return db('clients').select()
}

function getClientById(id) {
    return db('clients').where({ id }).first()
}

function insert(client) {
    return db('clients').insert(client, 'id').then(([id]) => id)
}

function update(id, changes){
    return db('clients').where({ id }).update(changes)
}


module.exports = {
    getClients,
    getClientById,
    insert,
    update
}