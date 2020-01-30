const db = require('../data/db.js');

function getStaff() {
    return db('staff').select();
}

function getStaffById(id) {
    return db('staff').where({ id }).first();
}


function getStaffBy(filter) {
    return db('staff').where({ filter }).first()
}


module.exports = {
    getStaff,
    getStaffById,
    getStaffBy
}