import Joi from 'joi';

export const authUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const loginWithGoogleSchema = Joi.object({
  code: Joi.string().required(),
});
