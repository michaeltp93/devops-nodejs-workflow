import express from 'express';
import mongoose from 'mongoose';
import { MONGO_URI, REDIS_PORT, REDIS_URL, SESSION_SECRET } from './config/config.js';
import cors from 'cors';
import postRoutes from './routes/postRoutes.js';
import authRoutes from './routes/userRoutes.js';
import session from 'express-session';
import redis from 'redis';

import connectRedis from 'connect-redis';
const RedisStore = connectRedis(session);

let redisClient = redis.createClient({
	host: REDIS_URL,
	port: REDIS_PORT,
});

const app = express();

const connectWithRetry = () => {
	mongoose
		.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			autoIndex: false,
		})
		.then(() => console.log('👉 Database connected Successfully ✅'))
		.catch(e => {
			console.log(e);
			setTimeout(connectWithRetry, 5000);
		});
};

connectWithRetry();

// middlewares
app.use(cors());
app.enable('trust proxy');
app.use(
	session({
		store: new RedisStore({ client: redisClient }),
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false,
			httpOnly: true,
			maxAge: 600000,
		},
	})
);
app.use(express.json());

// Route index
app.get('/api/v1', (req, res) => {
	res.send('<h2>Hello World</h2>');
	console.log('works :>> ', 'works');
});

// Routes
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/users', authRoutes);

// Running server
const PORT = process.env.PORT || 3200;
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT} 🚀`));
