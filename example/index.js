import express from 'express'
import redis from 'redis'
import antiflood from 'express-antiflood'
import RedisStore from 'express-antiflood-redis'

const PORT = 3000
const TIME_LIMIT = 10000
const TIME_BLOCKED = 60000
const TRIES = 3

const app = express()

const client = redis.createClient({
  host: 'localhost',
  port: 6380,
})
const store = RedisStore({ client })
const middleware = antiflood(store, {
  tries: TRIES,
  timeLimit: TIME_LIMIT,
  timeBlocked: TIME_BLOCKED,
})

// We use GET requests for simplicity
// You usually won't use antiflood in GET requests

app.get('/comment', middleware, (req, res) => {
  res.send(`Hello World! Please don't make more than ${TRIES} requests in ${TIME_LIMIT / 1000} seconds to this endpoint`)
})

app.get('/flood', (req, res) => {
  res.send('You can flood here as much as you want')
})

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}/`
  console.log(`Running on ${url}. Make GET requests to ${url}comment and ${url}flood`)
})
