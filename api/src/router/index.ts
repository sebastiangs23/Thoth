import { Router } from 'express';
import loginRouter from './login/index.js';
import userRouter from './users/index.js';
import conversationRouter from './conversations/index.js';
import LanguageRouter from './language/index.js';

const router = Router();

/*___________________
|   ROUTES LOGIN   */
router.use('/login', loginRouter);

/*___________________
|   ROUTES USERS   */
router.use('/users', userRouter);

/*__________________________
|   ROUTES CONVERSATION   */
router.use('/conversation', conversationRouter);

/*______________________
|  ROUTES LANGUAGES   */
router.use('/languages', LanguageRouter);

export default router;