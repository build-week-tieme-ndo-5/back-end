const db = require('../data/db.js');

function getStaff() {
    return db('staff').select('id', 'username', 'first_name', 'last_name');
}

function getStaffById(id) {
    return db('staff').where({ id }).select('id', 'username', 'first_name', 'last_name').first();
}


function getStaffByUsername(username) {
    return db('staff').where({ username }).select('id', 'username', 'first_name', 'last_name', 'password').first()
}

function insert(user){
    return db('staff').insert(user, 'id').then(([id]) => id)
}

function remove(id) {
    return db('staff').where({ id }).del();
}

function update(id, changes){
    return db('staff').where({ id }).update(changes)
}


module.exports = {
    getStaff,
    getStaffById,
    getStaffByUsername,
    insert,
    remove,
    update
}