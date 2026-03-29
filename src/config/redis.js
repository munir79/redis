

import { Redis } from '@upstash/redis'
const redisClient = new Redis({
  url: 'https://evident-bluejay-87416.upstash.io',
  // url: process.env.UPSTASH_REDIS_REST_URL,
  token: 'gQAAAAAAAVV4AAIncDFhYzhhY2Y2YzIxM2U0YmE5YThiMmNjZjA3ZDY3OWM2YXAxODc0MTY',
    // token: process.env.UPSTASH_REDIS_REST_TOKEN,

})

export default redisClient;
