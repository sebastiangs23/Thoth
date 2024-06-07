import { Router } from "express";
import { getUsers, createUser, updateUserLanguageLevel } from "../../controllers/users/userController.js"

const router = Router();

/*_________________
|   BRING USER   */
router.get('/', getUsers);

/*__________________
|   CREATE USER   */
router.post('/create', createUser);

/*_______________________________
|   EDIT LANGUAGE LEVEL USER   */
router.put('/update-user-level-language',  updateUserLanguageLevel);


export default router;