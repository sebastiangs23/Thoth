import { Router } from "express";
import { getUsers, createUser, updateUserLanguageLevel, updateUserAvatar } from "../../controllers/users/userController.js"

const router = Router();

/*_________________
|   BRING USER   */
router.get('/', getUsers);

/*__________________
|   CREATE USER   */
router.post('/create', createUser);

/*_______________________________
|   EDIT LANGUAGE LEVEL USER   */
router.put('/update-level-language',  updateUserLanguageLevel);

/*___________________________
|   EDIT THE USER AVATAR   */
router.put('/update-avatar', updateUserAvatar);


export default router;