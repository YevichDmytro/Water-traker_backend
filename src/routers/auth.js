import { Router } from 'express';

import {
  registerUserController,
  loginUserController,
  logoutUserController,
} from '../controllers/auth.js';
import validationBody from '../middlewares/validationBody.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { registerUserSchema, loginUserSchema } from '../validations/auth.js';

const router = Router();

router.post(
  '/register',
  validationBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validationBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

export default router;
