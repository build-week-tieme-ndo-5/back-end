const db = require('../data/db.js')
const clientsModel = require('./clients-model');

beforeEach(async () => {
    await db.seed.run()
})

describe('clients-model', () => {

    test('get client list', async () => {
        const res = await clientsModel.getClients()
        expect(res.length).toBeGreaterThan(0)
    })

    test('get client by id', async () => {
        const res = await clientsModel.getClientById(1)
        expect(res.name).toBe('e')
    })

    test('update client info', async () => {
        await clientsModel.update(2, {name: 'Fred'})
        const updatedClient = await clientsModel.getClientById(2)
        expect(updatedClient.name).toBe('Fred')
    })
    
    
    test('add a client', async () => {
        await clientsModel.insert({
            "name": "tom",
            "village": "rome",
            "loan_amount": 101.5,
            "loan_start": "2019-12-01",
            "loan_due": "2021-12-01"
        })
        const clients = await db('clients').select()
        expect(clients).toHaveLength(6)
    })

    test('remove client', async () => {
        await clientsModel.remove(1)
        const clientList = await db('clients').select()
        expect(clientList).toHaveLength(4)
    })

})