import { Router } from 'express';

import {
  getAllUsersController,
  getUserController,
  updateUserController,
} from '../controllers/user.js';
import { authenticate } from '../middlewares/authenticate.js';
import isValidId from '../middlewares/isValidId.js';
import { upload } from '../middlewares/upload.js';
import validationBody from '../middlewares/validationBody.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { updateUserSchema } from '../validations/users.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllUsersController));

router.get('/userById', isValidId, ctrlWrapper(getUserController));

router.patch(
  '/update',
  isValidId,
  upload.single('photo'),
  validationBody(updateUserSchema),
  ctrlWrapper(updateUserController),
);

export default router;
