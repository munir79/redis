import redisClient from "../config/redis.js";

export const rateLimit = (limit, windowSec) => {
  return async (req, res, next) => {
    try {
    //   const key = `rate:${req.ip}`;
        const key=`rate:${req.ip}`;

      const count = await redisClient.incr(key);

      if (count === 1) {
        await redisClient.expire(key, windowSec);
      }

      if (count > limit) {
        return res.status(429).json({
          success: false,
          message: "Too many requests ",
        });
      }

      next();
    } catch (err) {
      console.error("Rate Limit Error:", err);
      next();
    }
  };
};