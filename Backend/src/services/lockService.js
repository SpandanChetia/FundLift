// src/services/lockService.js
const redis = require('../utils/redisClient');  // your ioredis client
const Redlock = require('redlock');

const redlock = new Redlock(
  [redis],      // array of clients
  {
    retryCount:  5,
    retryDelay:  200,  // time in ms
    retryJitter: 200
  }
);

module.exports = redlock;
