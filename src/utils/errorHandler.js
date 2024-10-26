import { HttpError } from 'http-errors';

const errorHandler = (error, req, res, next) => {
  console.log(`You have this error: ${error}`);

  if (error instanceof HttpError) {
    res.status(error.status).json({
      status: error.status,
      message: error.message,
      data: error.data,
    });
    return;
  }
  res.status(500).json({
    status: 500,
    message: 'Something went wrong!',
    data: error,
  });
};

export default errorHandler;
