import Post from '../models/Post.js';

export const getAllPosts = async (req, res, next) => {
	try {
		const posts = await Post.find();

		res.status(200).json({
			status: 'success',
			result: posts.length,
			data: {
				posts,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message,
		});
	}
};

export const getOnePost = async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.id);

		res.status(200).json({
			status: 'success',
			data: {
				post,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message,
		});
	}
};

export const createPost = async (req, res, next) => {
	try {
		const post = await Post.create(req.body);

		res.status(200).json({
			status: 'success',
			data: {
				post,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message,
		});
	}
};

export const updatePost = async (req, res, next) => {
	try {
		const { id } = req.params;
		const body = req.body;
		const post = await Post.findByIdAndUpdate(id, body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({
			status: 'success',
			data: {
				post,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message,
		});
	}
};

export const deletePost = async (req, res, next) => {
	try {
		const { id } = req.params;
		const post = await Post.findByIdAndDelete(id);

		res.status(200).json({
			status: 'success',
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message,
		});
	}
};
