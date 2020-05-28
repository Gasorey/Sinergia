import { Router } from 'express';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';
import PostControllers from '../../controllers/PostControllers/PostControllers';

const postRouter = Router();

const postControllers = new PostControllers();

postRouter.use(ensureAuthenticated);
postRouter.post('/', postControllers.create);
postRouter.delete('/delete', postControllers.delete);

export default postRouter;
