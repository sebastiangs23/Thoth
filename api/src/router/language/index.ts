import { Router } from "express";
import { getLanguages, getLanguagesLevels } from "../../controllers/languages/languagesController.js";

const router = Router();

router.get('/get-languages', getLanguages);
router.get('/get-languages-levels', getLanguagesLevels);

export default router;