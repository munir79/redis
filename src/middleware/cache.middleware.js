import redisClient from "../config/redis.js";

export const cacheMiddleware = (prefix) => {
  return async (req, res, next) => {
    try {
      // const key = `${prefix}:${req.originalUrl}`;
      const key = `${prefix}:${req.method}:${req.originalUrl}`;
      const cachedData = await redisClient.get(key);

      if (cachedData) {
        console.log("Cache Hit:", key);

        let dataToSend;
        // check if cachedData is string
        if (typeof cachedData === "string") {
          try {
            dataToSend = JSON.parse(cachedData);
          } catch (err) {
            // if parse fail 
            dataToSend = cachedData;
          }
        } else {
          dataToSend = cachedData;
        }

        return res.json({
          success: true,
          source: "cache",
          data: dataToSend,
        });
      }

      console.log(" Cache Miss:", key);

      const originalJson = res.json.bind(res);
      res.json = async (body) => {
        // save as string 
        await redisClient.set(key, JSON.stringify(body), { ex: 60 });
        return originalJson(body);
      };

      next();
    } catch (err) {
      console.error("Cache Middleware Error:", err);
      next(); // Redis fail হলেও API চলে যাবে
    }
  };
};