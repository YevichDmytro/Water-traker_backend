import fs from 'node:fs/promises';
import path from 'node:path';

import createHttpError from 'http-errors';

import {
  getAllUsersService,
  getUserService,
  createUserService,
  updateUserService,
} from '../services/user.js';
import { uploadToCloudinary } from '../utils/uploadCloudinary.js';

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

  const changed = req.body;

  let photo = null;

  if (typeof req.file !== 'undefined') {
    if (process.env.ENABLE_CLOUDINARY === 'true') {
      const result = await uploadToCloudinary(req.file.path);
      await fs.unlink(req.file.path);

      photo = result.secure_url;
    } else {
      await fs.rename(
        req.file.path,
        path.resolve('src', 'public/avatars', req.file.filename),
      );

      photo = `http://localhost:3000/avatars/${req.file.filename}`;
    }

    changed.photo = photo;
  }

  const update = await updateUserService(id, changed);

  if (update === null) {
    return next(createHttpError.NotFound('User not found'));
  }
  if (update.lastErrorObject.updatedExisting === true) {
    return res.status(200).send({
      status: 200,
      message: `Update user ${id}`,
      data: update.value,
    });
  }
  res
    .status(201)
    .send({ status: 201, message: 'User updated', data: update.value });
};
