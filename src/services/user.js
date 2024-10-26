import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import User from '../db/models/Users.js';

export const getAllUsersService = () => {
  return User.find();
};

export const getUserService = async (userId) => {
  const user = await User.findById({ _id: userId });
  return {
    name: user.name,
    email: user.email,
    gender: user.gender,
    photo: user.photo,
  };
};

export const getWaterRateService = async (userId) => {
  const user = await User.findById({ _id: userId });
  return { waterRate: user.waterRate };
};

export const updateUserService = async (userData, changed) => {
  const { password, _id } = userData;
  const userByEmail = await User.findOne({ email: changed.email });

  if (userByEmail) {
    const isNotCurrentUser = userByEmail._id.toString() !== _id.toString();

    if (isNotCurrentUser) {
      throw createHttpError(409, 'Email in use');
    }
  }

  const isEqual = await bcrypt.compare(changed.outdatedPassword, password);

  if (!isEqual) {
    throw createHttpError(401, 'Invalid password');
  }

  const encryptedPassword = await bcrypt.hash(changed.outdatedPassword, 10);

  const user = await User.findByIdAndUpdate(
    { _id: _id },
    { ...changed, password: encryptedPassword },
    {
      new: true,
      includeResultMetadata: true,
      runValidators: true,
    },
  );

  if (!user || !user.value) return null;

  const { email, gender, name } = user.value;

  return {
    user: { email, gender, name },
    isNew: Boolean(user?.lastErrorObject?.upserted),
  };
};

export const updateAvatarService = async (id, avatar) => {
  const userAvatar = await User.findByIdAndUpdate({ _id: id }, avatar, {
    new: true,
    includeResultMetadata: true,
    runValidators: true,
  });

  if (!userAvatar || !userAvatar.value) return null;

  return {
    user: userAvatar.value,
    isNew: Boolean(userAvatar?.lastErrorObject?.upserted),
  };
};
