import { Router } from "express";
import getConversation from "../../controllers/conversations/conversationController.js";

const router = Router();

/*_____________________
   GET CONVERSATION  */
router.get('get-conversation', getConversation);

export default router;