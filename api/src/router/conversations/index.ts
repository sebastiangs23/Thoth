import { Router } from "express";
import { getConversation, getDialogsConversation } from "../../controllers/conversations/conversationController.js";

const router = Router();

/*___________________________
   GET CONVERSATION TOPIC  */
router.get('/get-conversations-topic-by-level/:id_language_level', getConversation);

/*_____________________
   GET CONVERSATION  */
router.get('/get-dialogs-conversation/:id_conversation', getDialogsConversation);

export default router;