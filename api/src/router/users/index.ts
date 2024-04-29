import { Router } from "express";
import { getUsers } from "../../controllers/users/userController.js"

const router = Router();

/*________________
   BRING USER   */
router.get('/', getUsers);

/*________________
   CREATE USER   */
// router.post('/create', )

export default router;