import User from '../db/models/Users.js';

export const getServiceUsers = () => {
  return User.find();
};

export const getServiceUser = (id) => {
  return User.findById({ _id: id });
};

export const createServiceUser = (payload) => {
  return User.create(payload);
};

export const updateServiceUser = (id, changed) => {
  return User.findByIdAndUpdate({ _id: id }, changed, {
    new: true,
    runValidators: true,
  });
};
