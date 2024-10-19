import Joi from 'joi';

export const createUserSchema = Joi.object({
  userName: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Name should be a string.',
    'string.min': 'Name should be at least {#limit} characters.',
    'string.max': 'Name should be at most {#limit} characters.',
    'any.required': 'Name is required.',
  }),
  email: Joi.string().email().optional().required().messages({
    'string.email': 'Email must be a valid email address!',
    'any.required': 'Email is required.',
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password must be a string.',
    'any.required': 'Password is required.',
  }),
  gender: Joi.string().valid('male', 'female').messages({
    'string.base': 'Gender must be a string.',
    'any.only': 'Gender must be one of {#valids}.',
  }),
});

export const updateUserSchema = Joi.object({
  email: Joi.string().email().messages({
    'string.email': 'Email must be a valid email address!',
  }),
  password: Joi.string().messages({
    'string.base': 'Password must be a string.',
  }),
  userName: Joi.string().min(3).max(30).messages({
    'string.base': 'Username should be a string.',
    'string.min': 'Username should be at least {#limit} characters.',
    'string.max': 'Username should be at most {#limit} characters.',
  }),
  gender: Joi.string().valid('male', 'female').messages({
    'string.base': 'Gender must be a string.',
    'any.only': 'Gender must be one of {#valids}.',
  }),
  waterRate: Joi.number().messages({
    'number.base': 'Water rate must be a number.',
  }),
  photo: Joi.string().uri().messages({
    'string.base': 'Photo must be a string.',
    'string.uri': 'Photo must be a valid URI.',
  }),
}).min(1);
