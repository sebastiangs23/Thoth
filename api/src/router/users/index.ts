import { Router } from "express";
import { createUser, updateUserLanguageLevel, updateUserAvatar } from "../../controllers/users/userController.js"

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


export default router;