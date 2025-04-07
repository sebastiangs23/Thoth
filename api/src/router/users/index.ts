import { Router } from "express";
import { createUser, verifiedEmail,resendVerificationCode, updateUserLanguageLevel, updateUserAvatar, updateUserData } from "../../controllers/users/userController.js"
import { getDaysConnected, createDayConnected } from "../../controllers/days-connected/daysConnectedController.js";

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

/*__________________________
|   CREATE DAYS CONNECTED  */
router.post('/create-days-connected' , createDayConnected);

/*_________________________
|   GET DAYS CONNECTED   */
router.get('/get-days-connected/:id_user',  getDaysConnected);

export default router;