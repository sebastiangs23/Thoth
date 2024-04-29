import { Router } from "express";
import { getCountries, getLevels } from '../../controllers/login/loginController.js';

const router = Router();

/*__________________
   GET COUNTRIES   */
router.get('/get-countries', getCountries);

/*________________
   GET LEVELS   */
router.get('/get-levels', getLevels);

export default router;