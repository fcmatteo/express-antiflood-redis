import 'babel-polyfill'
import chai from 'chai'
import bluebird from 'bluebird'
import RedisStore from '../src/main'

const should = chai.should()

const randomString = () => String(Math.random())

const timeout = (time) =>
  new Promise(resolve =>
    setTimeout(resolve, time),
  )

describe('RedisStore', () => {
  const store = RedisStore({ host: 'localhost', port: 6380 })

  it('should exist and expose a store API', () => {
    store.should.be.an('object')
    store.get.should.be.a('function')
    store.set.should.be.a('function')
  })

  it('should not exist the element if the key is not in the store', async () => {
    const obj = await store.get('undefinedUser')
    should.not.exist(obj)
  })

  it('should return the count of the key saved and later be deleted', async () => {
    const expireTime = 1000
    const nextDate = (new Date()).getTime() + expireTime
    const username = randomString()
    await store.set(username, 1, expireTime)
    const obj = await store.get(username)
    obj.should.be.an('object')
    obj.count.should.be.a('number')
    obj.count.should.be.equal(1)
    obj.nextDate.should.be.a('number')
    obj.nextDate.should.be.at.least(nextDate)
    // At normal conditions it should be almost the same
    obj.nextDate.should.be.at.most(nextDate + 500)

    await timeout(1000)
    const deleted = await store.get(username)
    should.not.exist(deleted)
  })
})
