import { Router } from "express";
import { createCountries } from '../../controllers/countries/countriesController.js';

const router = Router();

router.get('/create-countries-bd', createCountries);

export default router;