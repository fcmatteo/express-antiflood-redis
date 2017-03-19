# express-antiflood-redis
A Redis store for [express-antiflood](https://github.com/fcmatteo/express-antiflood)

# Usage
    import antiflood from 'express-antiflood'
    import RedisStore from 'express-antiflood-redis'
    
    const store = RedisStore({
      host: 'localhost',
      port: 6379
    })
    
    const middleware = antiflood(store)

# Options
The options are directly passed to [node_redis](https://github.com/NodeRedis/node_redis), so if no options are passed it will use defaults.

# TODO
* Option to use an existent Redis client
* Add more tests
* Improve `nextDate` field returned on the `get` method
