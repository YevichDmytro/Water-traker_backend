import createHttpError from 'http-errors';

import {
  getServiceUsers,
  getServiceUser,
  createServiceUser,
  updateServiceUser,
} from '../services/user.js';

export const getUsersController = async (req, res) => {
  const students = await getServiceUsers();

  res.send({ status: 200, data: students });
};

export const getUserController = async (req, res, next) => {
  const { id } = req.params;

  const user = await getServiceUser(id);

  if (user === null) {
    return next(createHttpError.NotFound('User not found!'));
  }

  res.send({ status: 200, message: `User with id:${id}`, data: user });
};

export const createUserController = async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    gender: req.body.gender,
  };

  const createUser = await createServiceUser(user);

  res
    .status(201)
    .send({ status: 201, message: 'Created User!', data: createUser });
};

export const updateUserController = async (req, res, next) => {
  const { id } = req.params;

  const user = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    gender: req.body.gender,
  };

  const update = await updateServiceUser(id, user);
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
