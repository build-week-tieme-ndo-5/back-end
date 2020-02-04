const supertest = require('supertest')
const staffModel = require('./staff-model.js')
const db = require('../data/db.js')

beforeEach(async () => {
    await db.seed.run()
})

test('get list of staff', async () => {
    const res = await staffModel.getStaff() 
    expect(res).toHaveLength(6)
})

test('find staff by id', async () => {
    const res = await staffModel.getStaffById(2)
    expect(res.first_name).toBe('b')
})

test('add new staff member', async () => {
    await staffModel.insert({
        "username": "wallace",
        "first_name": "wallace",
        "last_name": "wallace",
        "password": "tester"
    })
    const newStaff = await db('staff').select()
    expect(newStaff).toHaveLength(7)
})

test('delete staff member', async () => {
    await staffModel.remove(1)
    const newStaff = await db('staff').select()
    expect(newStaff).toHaveLength(5)
})