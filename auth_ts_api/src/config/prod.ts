export default {
    databaseUrl: process.env.DATABASE_URL,
    displayError: process.env.DISPLAY_ERROR,
    jwtSecret: process.env.JWT_SECRET.toString(),
    tokenExpiryMs: process.env.TOKEN_EXPIRY_MS,
};
