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
    waterRate: user.waterRate,
    photo: user.photo,
  };
};

export const updateUserService = async (id, changed) => {
  const user = await User.findByIdAndUpdate({ _id: id }, changed, {
    new: true,
    includeResultMetadata: true,
    runValidators: true,
  });

  if (!user || !user.value) return null;

  return {
    user: user.value,
    isNew: Boolean(user?.lastErrorObject?.upserted),
  };
};
