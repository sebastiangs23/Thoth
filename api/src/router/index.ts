import { Router } from 'express';
import loginRouter from './login/index.js';
import userRouter from './users/index.js';
import conversationRouter from './conversations/index.js';
import conversationContextRouter from './conversations_context/index.js';

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

/*__________________________________
|   ROUTES CONVERSATION-CONTEXT   */
router.use('/conversation-context', conversationContextRouter);


export default router;