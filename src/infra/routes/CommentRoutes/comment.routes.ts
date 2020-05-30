import { Router } from 'express';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';
import CommentController from '../../controllers/CommentControllers/CommentController';

const commentRouter = Router();

const commentController = new CommentController();

commentRouter.use(ensureAuthenticated);
commentRouter.post('/:post_id/createComment', commentController.create);
commentRouter.put('/:id/updateComment', commentController.update);
commentRouter.delete('/:id/delete', commentController.delete);

export default commentRouter;
