import { Router } from "express";
import { getUsers, createUser } from "../../controllers/users/userController.js"

const router = Router();

/*________________
   BRING USER   */
router.get('/', getUsers);

/*________________
   CREATE USER   */
router.post('/create', createUser);


export default router;