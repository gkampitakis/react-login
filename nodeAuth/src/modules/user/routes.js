import { Router } from 'express';
import Controller from './controller';
import { isAuthenticated } from '../../security/authentication';

const UserRouter = new Router();

UserRouter.get('/', isAuthenticated(), Controller.retrieve);
UserRouter.delete('/:id', Controller.delete);
UserRouter.put('/', Controller.update);
UserRouter.post('/', Controller.create);

export default UserRouter;
