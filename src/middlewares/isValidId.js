import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

const isValidId = (req, res, next) => {
  const { id } = req.params;

  if (isValidObjectId(id) !== true) {
    return next(createHttpError.NotFound('Id is not valid!'));
  }
  next();
};

export default isValidId;
