import { Router } from 'express';
import publicUsersRouter from './UserRoutes/publicUsers.routes';
import privateUsersRouter from './UserRoutes/privateUsers.routes';

const routes = Router();

routes.use('/publicUser', publicUsersRouter);
routes.use('/privateUser', privateUsersRouter);

export default routes;
