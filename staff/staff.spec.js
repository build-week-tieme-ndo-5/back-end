const supertest = require('supertest')
const server = require('../index.js')
const staffModel = require('./staff-model.js')
const db = require('../data/db.js')

const Token = require('../auth/token.js');

let token;

beforeAll((done) => {
    supertest(server)
        .post('/staff/login')
        .send({
            username: 'yb',
            password: 'tester'
        })
        .end((err, response) => {
            token = response.body.token;
            done()

        })
})

beforeEach(async () => {

    await db.seed.run()
})



test('get a list of staff members', () => {
    return supertest(server).get('/staff').set('Authorization', token)
        .then(res => {
            expect(res.status).toBe(200)
        })
        .catch(err => {
            console.log(err)
            return err;
        })
})


test('get a staff member by id', () => {
    return supertest(server).get('/staff/member/4').set('Authorization', token)
        .then(res => {
            expect(res.status).toEqual(200)
        })
})


test('register new staff member', async () => {
    const res = await supertest(server)
        .post('/staff/register')
        .send({ username: 'hs', first_name: 'homer', last_name: 'simpson', password: 'tester' })
    expect(res.status).toBe(201)
    expect(res.type).toBe("application/json")
})

test('log in existing user', async () => {
    const res = await supertest(server)
        .post('/staff/login')
        .send({ username: 'yb', password: 'tester' })

    expect(res.status).toBe(200)
    expect(res.type).toBe("application/json")
})


test('get list of staff', async () => {
    const res = await staffModel.getStaff()
    expect(res.length).toBe(6)
})

test('find staff by id', async () => {
    const res = await staffModel.getStaffById(4)

    expect(res.first_name).toBe('d')
})


test('delete staff member', async () => {
    await staffModel.remove(1)
    const newStaff = await db('staff').select()
    expect(newStaff).toHaveLength(5)
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










