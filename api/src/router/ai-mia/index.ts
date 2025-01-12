import { Router } from "express";
import { consumeAiMia } from "../../controllers/ai-mia/aiMiaController.js";

const router = Router();

router.post('/ask', consumeAiMia);

export default router;