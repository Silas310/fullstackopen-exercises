const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
// the test requires the Express app (server instance)
// uses supertest (it uses superagent) to make HTTP requests to the server
// it does not require the server to be running, supertest will handle that
test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
// its does the same as other tests
// its checks if the response is 200 and if the content type is application/json
after(async () => { // after all tests have run, close the mongoose connection
  await mongoose.connection.close()
})