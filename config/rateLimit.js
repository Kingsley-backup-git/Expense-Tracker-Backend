const { Ratelimit } = require("@upstash/ratelimit");
const { Redis } = require("@upstash/redis");

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

module.exports = ratelimit;
 