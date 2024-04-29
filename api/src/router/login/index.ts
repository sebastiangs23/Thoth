import { Router } from "express";
import { getCountries } from '../../controllers/login/loginController.js';

const router = Router();

/*__________________
   GET COUNTRIES   */
router.get('/get-countries', getCountries);

export default router;