import createHttpError from 'http-errors';

import {
  getAllUsersService,
  getUserService,
  getWaterRateService,
  updateUserService,
  updateAvatarService,
  updateWaterRateService,
} from '../services/user.js';
import { env } from '../utils/env.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export const getAllUsersController = async (req, res) => {
  const user = await getAllUsersService();

  res.send({ status: 200, data: user });
};

export const getUserController = async (req, res, next) => {
  const userId = req.user._id;

  const userById = await getUserService(userId);

  if (userById === null) {
    return next(createHttpError.NotFound('User not found'));
  }

  res.send({
    status: 200,
    message: `User successfully found`,
    data: userById,
  });
};

export const getWaterRateController = async (req, res, next) => {
  const userId = req.user._id;

  const userById = await getWaterRateService(userId);

  if (userById === null) {
    return next(createHttpError.NotFound('User not found'));
  }

  res.send({
    status: 200,
    message: `User's ${userById.name} WaterRate!`,
    data: userById.waterRate,
  });
};

export const updateUserController = async (req, res, next) => {
  const user = req.user;

  const update = await updateUserService(user, {
    ...req.body,
  });

  if (!update) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a User!',
    data: update.user,
  });
};

export const updateAvatarController = async (req, res, next) => {
  const userId = req.user._id;

  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const update = await updateAvatarService(userId, {
    photo: photoUrl,
  });

  if (!update) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a User!',
    data: update.user.photo,
  });
};

export const updateWaterRateController = async (req, res) => {
  const userId = req.user._id;
  const user = await updateWaterRateService(userId, { ...req.body });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated water rate',
    data: { waterRate: user.value.waterRate },
  });
};
