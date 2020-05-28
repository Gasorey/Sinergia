import { Router } from 'express';
import publicUsersRouter from './UserRoutes/publicUsers.routes';
import privateUsersRouter from './UserRoutes/privateUsers.routes';
import postRouter from './PostRoutes/post.routes';

const routes = Router();

routes.use('/publicUser', publicUsersRouter);
routes.use('/privateUser', privateUsersRouter);
routes.use('/post', postRouter);

export default routes;
