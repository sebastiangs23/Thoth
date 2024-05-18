import { Router } from "express";
import getLanguages from "../../controllers/languages/languagesController.js";

const router = Router();

router.get('/get-languages', getLanguages);

export default router;