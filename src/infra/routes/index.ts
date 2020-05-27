import { Router } from 'express';
import usersRouter from './UserRoutes/users.routes';

const routes = Router();

routes.use('/users', usersRouter);

export default routes;
