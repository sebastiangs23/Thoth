import { Router } from "express";
import { getAreas , getSpecificTopics, getDialogs, getSituations } from "../../controllers/conversations/conversationController.js";

const router = Router();

/*______________
|  GET AREAS  */
router.get('/get-areas', getAreas);

/*________________________
|  GET SPECIFIC TOPICS  */
router.get('/get-specific-topics/:id_area', getSpecificTopics);

/*________________
|  GET DIALOGS  */
router.get('/get-dialogs/:id_specific_topic/:id_language_level', getDialogs);

/*___________________
|  GET SITUATIONS  */
router.get('/situations', getSituations);

export default router;