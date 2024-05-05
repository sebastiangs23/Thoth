import { Router } from "express";
import { getConversationContext } from "../../controllers/conversation_context/conversation_contextController.js";

const router = Router();

router.get('/get-conversations-context', getConversationContext);

export default router;