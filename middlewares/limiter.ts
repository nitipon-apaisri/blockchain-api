import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 5 * 1000, // 5 seconds
    max: 10, // 10 requests
    message: "Too many requests",
});
