import redis from 'redis'
import bluebird from 'bluebird'

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

export default function RedisStore(options) {
  const client = options.client || redis.createClient(options)
  return {
    async get(key) {
      const elem = await client.getAsync(key)
      if (!elem) {
        return null
      }
      const nextDate = await client.pttlAsync(key)
      return {
        count: Number(elem),
        nextDate: (new Date()).getTime() + nextDate,
      }
    },
    async set(key, count, expire) {
      await client.setAsync(key, String(count), 'PX', expire)
    },
  }
}
