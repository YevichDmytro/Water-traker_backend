import express from 'express';

import {
  getAllUsersController,
  getUserController,
  createUserController,
  updateUserController,
} from '../controllers/user.js';
import isValidId from '../middlewares/isValidId.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(getAllUsersController));

router.get('/:id', isValidId, ctrlWrapper(getUserController));

router.post('/', ctrlWrapper(createUserController));

router.patch('/:id', ctrlWrapper(updateUserController));

export default router;
