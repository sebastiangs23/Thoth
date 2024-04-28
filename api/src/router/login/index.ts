import { Router } from "express";
import { createUser } from '../../controllers/login/loginController.js';

const router = Router();

router.get('/', createUser);

export default router;