import { Router } from 'express';
import loginRouter from './login/index.js';
import userRouter from './users/index.js';

const router = Router();

/*___________________
|   ROUTES LOGIN   */
router.use('/login', loginRouter);

/*___________________
|   ROUTES USERS   */
router.use('/users', userRouter);


export default router;