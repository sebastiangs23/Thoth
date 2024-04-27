import { Router } from "express";
import { createUsers } from '../../controllers/login/loginController.js';

const router = Router();

router.get('/', createUsers);

export default router;