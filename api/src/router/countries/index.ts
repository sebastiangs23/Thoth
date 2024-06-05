import { Router } from "express";
import { createCountries, getCountries } from '../../controllers/countries/countriesController.js';

const router = Router();

/*_______________________________________________________________________________
|   ENDPOINT IN CHARGE OF CREATING THE COUNTRIES IN DB THROUGH AN EXTERNAL API   |
|   IT IS GONNA BE USED JUST 1 TIME                                              |
router.get('/create-countries-bd', createCountries);                            */

/*___________________
|   GET COUNTRIES   */
router.get('/get-countries-db', getCountries);

export default router;