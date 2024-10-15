import { HttpError } from 'http-errors';

const errorHandler = async (error, req, res, next) => {
  console.log(`It's my error: ${error}`);

  if (error instanceof HttpError) {
    res.status(error.status).json({
      status: error.status,
      message: error.name,
      data: error,
    });
    return;
  }
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: error,
  });
};

export default errorHandler;
