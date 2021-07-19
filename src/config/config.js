const MONGO_API = process.env.MONGO_API || 'mongo';
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_USER = process.env.MONGO_USER || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';

export const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_API}:${MONGO_PORT}/?authSource=admin`;

export const REDIS_URL = process.env.REDIS_URL || 'redis';
export const REDIS_PORT = process.env.REDIS_PORT || 6379;
export const SESSION_SECRET = process.env.SESSION_SECRET;
