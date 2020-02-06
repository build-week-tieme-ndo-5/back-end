const db = require('../data/db.js')
const clientsModel = require('./clients-model');
const supertest = require('supertest')
const server = require('../index.js')

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

test('Get client list router', () => {
    return supertest(server).get('/clients').set('Authorization', token)
        .then(res => {
            expect(res.status).toEqual(200)

        })
        .catch(err => {
            console.log(err)
            return err;
        })
})


test('get client list model', () => {
    return clientsModel.getClients()
        .then(res => {
            expect(res.length).toBeGreaterThan(0)
        })
})


test('get client by id', () => {
    return clientsModel.getClientById(4)
        .then(res => {
            expect(res.name).toBe('h')
        })
})


test('update client info', async () => {
    const serpico = await clientsModel.update(2, { name: 'Fred' })

    const updatedClient = await clientsModel.getClientById(2)
    expect(updatedClient.name).toBe('Fred')
})


test('add a client', async () => {
    const origList = await db('clients').select()
    await clientsModel.insert({
        "name": "tom",
        "village": "rome",
        "loan_amount": 101.5,
        "loan_start": "2019-12-01",
        "loan_due": "2021-12-01"
    })
    const newList = await db('clients').select()
    expect(newList.length).toBeGreaterThan(origList.length)
})

test('remove client', async () => {
    const oldList = await db('clients').select()

    const question = await clientsModel.remove(3)

    const newList = await db('clients').select()

    expect(question).toBe(1)
})







