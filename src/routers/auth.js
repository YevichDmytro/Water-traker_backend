import { Router } from 'express';

import {
  registerUserController,
  loginUserController,
  logoutUserController,
  sendResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import validationBody from '../middlewares/validationBody.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {
  authUserSchema,
  resetPasswordSchema,
  sendResetEmailShema,
} from '../validations/auth.js';

const router = Router();

router.post(
  '/register',
  validationBody(authUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validationBody(authUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post(
  '/send-reset-email',
  validationBody(sendResetEmailShema),
  ctrlWrapper(sendResetEmailController),
);

router.post(
  '/reset-password',
  validationBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default router;
