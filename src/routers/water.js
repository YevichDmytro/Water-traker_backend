import { Router } from 'express';

import {
  createWaterController,
  editWaterController,
  deleteWaterController,
  getWaterByMonthController,
  getWaterTodayController,
} from '../controllers/water.js';
import { authenticate } from '../middlewares/authenticate.js';
import isValidId from '../middlewares/isValidWaterId.js';
import validateParams from '../middlewares/validateParams.js';
import validationBody from '../middlewares/validationBody.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {
  createWaterSchema,
  updateWaterSchema,
  monthSchema,
} from '../validations/water.js';

const waterRouter = Router();

waterRouter.use(authenticate);

waterRouter.post(
  '/',
  validationBody(createWaterSchema),
  ctrlWrapper(createWaterController),
);

waterRouter.patch(
  '/:id',
  isValidId,
  validationBody(updateWaterSchema),
  ctrlWrapper(editWaterController),
);

waterRouter.delete('/:id', isValidId, ctrlWrapper(deleteWaterController));

waterRouter.get('/today', ctrlWrapper(getWaterTodayController));

waterRouter.get(
  '/month/:date',
  validateParams(monthSchema),
  ctrlWrapper(getWaterByMonthController),
);

export default waterRouter;
