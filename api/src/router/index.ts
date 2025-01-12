import { Router } from 'express';
import loginRouter from './login/index.js';
import userRouter from './users/index.js';
import conversationRouter from './conversations/index.js';
import LanguageRouter from './language/index.js';
import scoreRouter from './score/index.js';
import CountriesRouter from './countries/index.js';
import ChatGptRouter from './chat-gpt/index.js';
import AiMiaRouter from './ai-mia/index.js';
import PlansRouter from './plans/index.js';
import RootRouter from './root/index.js';

const router = Router();

/*___________________
|   ROUTES ROOT   */
router.use('/', RootRouter);

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

/*__________________
|  ROUTES SCORE   */
router.use('/score', scoreRouter);

/*__________________
|  ROUTES SCORE   */
router.use('/countries', CountriesRouter);

/*______________________
|   ROUTES CHAT-GPT   */
router.use('/chat-gpt', ChatGptRouter);

/*___________________
|   ROUTES PLANS   */
router.use('/plans', PlansRouter);

/*___________________
|   ROUTES AI-MIA   */
router.use('/ai-mia', AiMiaRouter);

export default router;