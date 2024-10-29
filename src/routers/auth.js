import { Router } from 'express';

import {
  registerUserController,
  loginUserController,
  logoutUserController,
  getOAuthUrl,
  loginWithGoogle,
} from '../controllers/auth.js';
import validationBody from '../middlewares/validationBody.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { authUserSchema, loginWithGoogleSchema } from '../validations/auth.js';

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

router.get('/get-oauth-url', ctrlWrapper(getOAuthUrl));

router.post(
  '/confirm-oauth',
  validationBody(loginWithGoogleSchema),
  ctrlWrapper(loginWithGoogle),
);

export default router;
