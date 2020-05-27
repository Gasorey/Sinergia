import { Router } from 'express';
import PublicUsersController from '../../controllers/UserControllers/PublicUsersControllers';

const usersRouter = Router();
const usersController = new PublicUsersController();

usersRouter.post('/', usersController.create);
usersRouter.post('/login', usersController.authenticate);

export default usersRouter;
