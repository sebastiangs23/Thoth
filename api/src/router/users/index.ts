import { Router } from "express";
import { createUser, verifiedEmail,resendVerificationCode, updateUserLanguageLevel, updateUserAvatar, updateUserData } from "../../controllers/users/userController.js"

const router = Router();

/*__________________
|   CREATE USER   */
router.post('/create', createUser);

/*_____________________
|   VERIFIED EMAIL   */
router.put('/verified-email/:id_user', verifiedEmail);

/*_______________________________
|   RESEND VERIFICATION CODE   */
router.post('/resend-verification-code/:id_user', resendVerificationCode);

/*_______________________________
|   EDIT LANGUAGE LEVEL USER   */
router.put('/update-level-language',  updateUserLanguageLevel);

/*___________________________
|   EDIT THE USER AVATAR   */
router.put('/update-avatar', updateUserAvatar);

/*_________________________
|   EDIT THE USER DATA   */
router.put('/update-data-user', updateUserData);

/*_________________________
|   CREATE CONNECTED DAY   */
// router.post('/create', );

export default router;