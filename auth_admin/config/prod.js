module.exports = {
    jwtSecret: process.env.JWT_SECRET.toString(),
    tokenExpiryMs: process.env.TOKEN_EXPIRY_MS,
    urlRoot: process.env.URL_ROOT,
};
