import { Router } from "express";
import { createUser, updateUserLanguageLevel, updateUserAvatar, updateUserData } from "../../controllers/users/userController.js"

const router = Router();

/*__________________
|   CREATE USER   */
router.post('/create', createUser);

/*_______________________________
|   EDIT LANGUAGE LEVEL USER   */
router.put('/update-level-language',  updateUserLanguageLevel);

/*___________________________
|   EDIT THE USER AVATAR   */
router.put('/update-avatar', updateUserAvatar);

/*_________________________
|   EDIT THE USER DATA   */
router.put('/update-data-user', updateUserData);

export default router;