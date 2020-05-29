import { Router } from 'express';
import publicUsersRouter from './UserRoutes/publicUsers.routes';
import privateUsersRouter from './UserRoutes/privateUsers.routes';
import postRouter from './PostRoutes/post.routes';
import commentRouter from './CommentRoutes/comment.routes';

const routes = Router();

routes.use('/publicUser', publicUsersRouter);
routes.use('/privateUser', privateUsersRouter);
routes.use('/post', postRouter);
routes.use('/comment', commentRouter);

export default routes;
