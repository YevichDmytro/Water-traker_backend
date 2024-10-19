import { Router } from 'express';

import {
  getAllUsersController,
  getUserController,
  createUserController,
  updateUserController,
} from '../controllers/user.js';
import { authenticate } from '../middlewares/authenticate.js';
import isValidId from '../middlewares/isValidId.js';
import { upload } from '../middlewares/upload.js';
import validationBody from '../middlewares/validationBody.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { createUserSchema, updateUserSchema } from '../validations/users.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllUsersController));

router.get('/:id', isValidId, ctrlWrapper(getUserController));

// router.post(
//   '/',
//   upload.single('photo'),
//   validationBody(createUserSchema),
//   ctrlWrapper(createUserController),
// );

router.patch(
  '/:id',
  isValidId,
  upload.single('photo'),
  validationBody(updateUserSchema),
  ctrlWrapper(updateUserController),
);

export default router;
