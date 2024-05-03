import { Router } from "express";
import { getCountries, getLevels, logInUser } from '../../controllers/login/loginController.js';

const router = Router();

/*__________________
   GET COUNTRIES  */
router.get('/get-countries', getCountries);

/*_______________
   GET LEVELS  */
router.get('/get-levels', getLevels);

/*________________
   LOG IN USER   */
router.get('/login-user', logInUser);

export default router;