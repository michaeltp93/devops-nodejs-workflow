import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const signUp = async (req, res) => {
	const { username, password } = req.body;

	try {
		const hashpassword = await bcrypt.hash(password, 12);
		const newUser = await User.create({ username, password: hashpassword });

		req.session.user = newUser;
		res.status(201).json({
			status: 'success',
			data: {
				user: newUser,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			msg: err.message,
		});
	}
};

export const login = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });

		if (!user) {
			return res.status(404).json({
				status: 'fail',
				msg: 'user not found',
			});
		}

		const isCorrect = await bcrypt.compare(password, user.password);

		if (isCorrect) {
			req.session.user = user;
			return res.status(200).json({
				status: 'success',
			});
		} else {
			res.status(400).json({
				status: 'fail',
				message: 'incorrect username or password',
			});
		}
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			msg: err.message,
		});
	}
};
