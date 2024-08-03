import { Router } from "express";
import {audioScore , getUserScoreAverage}  from "../../controllers/score/scoreController.js";
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
/*__________________
|   AUDIO SCORE   */
router.post('/audio', upload.single('voice'), audioScore);

/*________________________
|   GET AVERAGE SCORE   */
router.get('/get-user-score-average/:id_user', getUserScoreAverage);

export default router;