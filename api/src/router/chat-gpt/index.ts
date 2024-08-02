import { Router } from "express";
import { consumeChatGpt } from "../../controllers/chat-gpt/chatGptController.js";

const router = Router();

router.post('/answer', consumeChatGpt);

export default router;