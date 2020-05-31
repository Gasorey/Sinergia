import { Router } from 'express';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';
import PrivateUsersController from '../../controllers/UserControllers/PrivateUsersControllers';

const privateUserRouter = Router();

const privateUsersController = new PrivateUsersController();

privateUserRouter.use(ensureAuthenticated);
privateUserRouter.get('/', privateUsersController.show);
privateUserRouter.put('/', privateUsersController.update);
privateUserRouter.delete('/', privateUsersController.delete);

export default privateUserRouter;
