import { Router } from "express";
import { createUser, verifiedEmail,updateUserLanguageLevel, updateUserAvatar, updateUserData } from "../../controllers/users/userController.js"

const router = Router();

/*__________________
|   CREATE USER   */
router.post('/create', createUser);

/*__________________
|   CREATE USER   */
router.put('/verified-email/:id_user', verifiedEmail);

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