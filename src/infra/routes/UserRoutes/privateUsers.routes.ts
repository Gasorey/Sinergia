import { Router } from 'express';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';
import PrivateUsersController from '../../controllers/UserControllers/PrivateUsersControllers';

const privateUserRouter = Router();

const privateUsersController = new PrivateUsersController();

privateUserRouter.use(ensureAuthenticated);
privateUserRouter.get('/', privateUsersController.show);
privateUserRouter.put('/update', privateUsersController.update);
privateUserRouter.delete('/delete', privateUsersController.delete);

export default privateUserRouter;
