import { Router } from "express";
import audioScore  from "../../controllers/score/scoreController.js";
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
/*__________________
|   AUDIO SCORE   */
router.post('/audio', upload.single('voice'), audioScore);

export default router;