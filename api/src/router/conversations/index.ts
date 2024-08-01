import { Router } from "express";
import { getAreas , getConversation, getDialogsConversation, getSpecificTopics, getDialogs } from "../../controllers/conversations/conversationController.js";

const router = Router();

/*______________
|  GET AREAS  */
router.get('/get-areas', getAreas);

/*___________________________
|  GET CONVERSATION TOPIC  */
router.get('/get-conversations-topic-by-level/:id_language_level', getConversation); //x

/*_____________________
|  GET CONVERSATION  */
router.get('/get-dialogs-conversation/:id_conversation', getDialogsConversation); //x

/*________________________
|  GET SPECIFIC TOPICS  */
router.get('/get-specific-topics/:id_area', getSpecificTopics);

/*________________
|  GET DIALOGS  */
router.get('/get-dialogs/:id_specific_topic', getDialogs);

export default router;