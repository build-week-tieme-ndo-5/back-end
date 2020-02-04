const supertest = require('supertest');

const server = require('./index')

test('welcome router', async () => {
    const res = await supertest(server).get('/')

    expect(res.status).toBe(200)

    expect(res.type).toBe('application/json')

    expect(res.body.message).toMatch(/welcome to tieme-ndo/i)
})