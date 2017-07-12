# express-antiflood-redis
A Redis store for [express-antiflood](https://github.com/fcmatteo/express-antiflood)

# Usage
```javascript
import antiflood from 'express-antiflood'
import RedisStore from 'express-antiflood-redis'

const store = RedisStore({
  host: 'localhost',
  port: 6379
})

const middleware = antiflood(store)
```

# Options
The options are directly passed to [node_redis](https://github.com/NodeRedis/node_redis), so if no options are passed it will use defaults.
You can use a pre-connected client by passing the option `client`. In that case all the other options will be ignored.

# TODO
* Add more tests
* Improve `nextDate` field returned on the `get` method
