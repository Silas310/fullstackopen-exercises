const assert = require('node:assert')
const test = require('node:test')
const supertest = require('supertest')
const app = require('./app')
const api = supertest(app)
// ...

test('all notes are returned', async () => {
  const response = await api.get('/api/notes')

  assert.strictEqual(response.body.length, 2)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(e => e.content)
  assert(contents.includes('HTML is easy'), true)
})

// ...