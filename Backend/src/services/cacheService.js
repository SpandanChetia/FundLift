const redis = require('../utils/redisClient');

exports.get = async key => {
  const v = await redis.get(key);
  return v ? JSON.parse(v) : null;
};

exports.set = async (key, val, ttl = 60) => {
  await redis.setEx(key, ttl, JSON.stringify(val));
};

exports.del = async key => {
  await redis.del(key);
};
