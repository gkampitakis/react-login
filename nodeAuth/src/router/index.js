import { Router } from 'express';
import UserRouter from '../modules/user/routes';
import LocalAuthRouter from '../security/index';

const router = Router();

router.use('/users', UserRouter);
router.use('/auth', LocalAuthRouter);
export default router;
