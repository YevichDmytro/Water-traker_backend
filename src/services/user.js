import User from '../db/models/Users.js';

export const getAllUsersService = () => {
  return User.find();
};

export const getUserService = (id) => {
  return User.findById({ _id: id });
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
