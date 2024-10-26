import { Router } from 'express';

import {
  getAllUsersController,
  getUserController,
  getWaterRateController,
  updateUserController,
  updateAvatarController,
} from '../controllers/user.js';
import { authenticate } from '../middlewares/authenticate.js';
import isValidId from '../middlewares/isValidId.js';
import { upload } from '../middlewares/upload.js';
import validationBody from '../middlewares/validationBody.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { updateUserSchema, updateAvatarSchema } from '../validations/users.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllUsersController));

router.get('/userById', isValidId, ctrlWrapper(getUserController));

router.get('/waterRate', isValidId, ctrlWrapper(getWaterRateController));

router.patch(
  '/update',
  isValidId,
  validationBody(updateUserSchema),
  ctrlWrapper(updateUserController),
);

router.patch(
  '/avatar',
  isValidId,
  upload.single('photo'),
  validationBody(updateAvatarSchema),
  ctrlWrapper(updateAvatarController),
);

export default router;
