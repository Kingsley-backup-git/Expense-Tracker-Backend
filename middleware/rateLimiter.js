const ratelimit = require("../config/rateLimit")

async function RateLimiter(req, res, next) {
  try {

 const identifier =  req?.ip || "api";
const { success } = await ratelimit.limit(identifier);

if (!success) {
 return res.status(429).json({ message: "Too many requests" });

}
next()
  } catch (err) {
    console.log(err)
        next();
  }
   
}

module.exports = {
    RateLimiter
}