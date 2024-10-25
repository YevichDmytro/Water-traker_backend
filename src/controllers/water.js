import createHttpError from 'http-errors';

import {
  addWaterDataService,
  editWaterService,
  deleteWaterService,
  getWaterTodayService,
  getWaterByMonthService,
} from '../services/water.js';
import formatDateTime from '../utils/formatDate.js';
import formatMonth from '../utils/formatDateTime.js';

export const createWaterController = async (req, res, next) => {
  const { value, dateTime } = req.body;
  const userId = req.user._id;

  if (!value) {
    return next(createHttpError(400, 'Required fields are missing'));
  }

  const currentDate = new Date();

  const dateToUse = dateTime ? dateTime : formatDateTime(currentDate);

  const waterRecord = await addWaterDataService({
    value,
    dateTime: dateToUse,
    userId,
  });

  res.status(201).json({
    status: 201,
    message: 'Water record created successfully!',
    data: waterRecord,
  });
};

export const editWaterController = async (req, res, next) => {
  const { id } = req.params;

  const result = await editWaterService(id, {
    ...req.body,
  });

  if (!result) {
    next(createHttpError(404, 'Record not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched water record!',
    data: result,
  });
};

export const deleteWaterController = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  const waterToDelete = await deleteWaterService(id, userId);

  if (!waterToDelete) {
    next(createHttpError(404, 'Record not found'));
    return;
  }

  res.status(204).send();
};

export const getWaterTodayController = async (req, res) => {
  const userId = req.user._id;

  const waterData = await getWaterTodayService(userId);
  res.status(200).json({
    success: true,
    data: waterData,
  });
};

export const getWaterByMonthController = async (req, res) => {
  const userId = req.user._id;

  const { date } = req.params;
  const [month, year] = date.split('-').map(Number);

  const data = await getWaterByMonthService(userId, month, year);

  return res.status(200).json({
    status: 200,
    message: 'Water consumption data per month retrieved successfully!',
    data: {
      date: formatMonth(date),
      waterData: data,
    },
  });
};
