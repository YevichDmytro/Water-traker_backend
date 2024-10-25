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

export const updateUserService = async (id, changed) => {
  const user = await User.findByIdAndUpdate({ _id: id }, changed, {
    new: true,
    includeResultMetadata: true,
    runValidators: true,
  });

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
