import ratelimit from "../config/upstash.js";

const rateLimiter=async (req,res,next)=>{
    try {
        const {success}= await ratelimit.limit("my-limit-key");
        // const {success}= await ratelimit.limit(userId or IP adress); //rate limit per user
        
        if(!success) {
            return res.status(429).json({
                message: "Too many requests, please tr again later"
            })
        }
        next();
    } catch (error) {
        console.log("Rate limit error",error);
        next(error);
    }
}

export default rateLimiter;