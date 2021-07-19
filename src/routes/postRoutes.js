import { Router } from 'express';
import * as postController from '../controllers/postController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

router.route('/').get(protect, postController.getAllPosts).post(protect, postController.createPost);

router
	.route('/:id')
	.get(protect, postController.getOnePost)
	.patch(protect, postController.updatePost)
	.delete(protect, postController.deletePost);

export default router;
