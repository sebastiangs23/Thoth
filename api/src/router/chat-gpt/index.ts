import { Router } from "express";
import { consumeChatGpt } from "../../controllers/chat-gpt/chatGptController.js";

const router = Router();

router.get('/answer/:nivel_ingles/:tema_conversacion', consumeChatGpt);

export default router;