import User from '../db/models/Users.js';

export const getAllUsersService = () => {
  return User.find();
};

export const getUserService = (id) => {
  return User.findById({ _id: id });
};

export const createUserService = (payload) => {
  return User.create(payload);
};

export const updateUserService = (id, changed) => {
  return User.findByIdAndUpdate({ _id: id }, changed, {
    new: true,
    runValidators: true,
  });
};
