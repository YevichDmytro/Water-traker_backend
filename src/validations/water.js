import Joi from 'joi';

export const waterChangedSchema = Joi.object({
  amount: Joi.number().min(0).required().messages({
    'number.base': 'Amount must be a number.',
    'number.min': 'Amount cannot be negative.',
    'any.required': 'Amount is required.',
  }),
  date: Joi.date().iso().required().messages({
    'date.base': 'Date must be a valid date.',
    'date.format': 'Date must be in ISO format (YYYY-MM-DD).',
    'any.required': 'Date is required.',
  }),
});
