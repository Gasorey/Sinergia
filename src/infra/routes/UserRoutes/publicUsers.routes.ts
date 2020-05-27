import { Router } from 'express';
import PublicUsersController from '../../controllers/UserControllers/PublicUsersControllers';

const publicUsersRouter = Router();
const usersController = new PublicUsersController();

publicUsersRouter.post('/', usersController.create);
publicUsersRouter.post('/login', usersController.authenticate);

export default publicUsersRouter;
