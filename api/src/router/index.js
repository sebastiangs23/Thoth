import { Router } from "express";
import loginRouter from './login/index.js';

const router = Router();

/*___________________
|   ROUTES LOGIN   */
router.use('/login', loginRouter);


//AQUI IRAN TODAS LAS RUTAS CON SUS RESPECTIVAS SUBRUTAS DENTRO

export default router;