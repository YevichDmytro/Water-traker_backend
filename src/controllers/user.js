import createHttpError from 'http-errors';

import {
  getAllUsersService,
  getUserService,
  createUserService,
  updateUserService,
} from '../services/user.js';
import { env } from '../utils/env.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export const getAllUsersController = async (req, res) => {
  const students = await getAllUsersService();

  res.send({ status: 200, data: students });
};

export const getUserController = async (req, res, next) => {
  const { id } = req.params;

  const userById = await getUserService(id);

  if (
    userById === null ||
    userById.userId.toString() !== req.user._id.toString()
  ) {
    return next(createHttpError.NotFound('User not found'));
  }

  res.send({ status: 200, message: `User with id:${id}`, data: userById });
};

export const createUserController = async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    gender: req.body.gender,
  };

  const createUser = await createUserService(user);

  res
    .status(201)
    .send({ status: 201, message: 'Created User!', data: createUser });
};

export const updateUserController = async (req, res, next) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const update = await updateUserService(
    { _id: id, userId },
    {
      ...req.body,
      photo: photoUrl,
    },
  );
  console.log(
    { _id: id, userId },
    {
      ...req.body,
      photo: photoUrl,
    },
  );

  if (!update) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a User!',
    update: update.user,
  });
};
