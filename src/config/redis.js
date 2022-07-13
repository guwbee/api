import Redis from 'ioredis'
import { promisify } from 'util'

const redisClient = new Redis()

function getRedis(value) {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient)
  return syncRedisGet(value)
}

function setRedis(key, value) {
  const syncRedisSet = promisify(redisClient.set).bind(redisClient)
  return syncRedisSet(key, value)
}

export default { redisClient, getRedis, setRedis }
