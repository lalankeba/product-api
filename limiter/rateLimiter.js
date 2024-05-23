const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
	limit: 20,
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    message: { message: `Too many requests. Please try again later...` }
});

module.exports = limiter;