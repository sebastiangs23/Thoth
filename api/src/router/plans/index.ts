import { Router } from "express";
import { getPlans, getUsersCurrentPlan, getUserPlanHistory } from "../../controllers/plans/plansController.js";

const router = Router();

router.get('/', getPlans);
router.get('/user-current', getUsersCurrentPlan);
router.get('/update-user', getUserPlanHistory);

export default router;