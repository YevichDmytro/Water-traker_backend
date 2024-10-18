import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import pino from 'pino-http';

import swaggerDocs from './middlewares/swaggerDocs.js';
import router from './routers/index.js';
import { env } from './utils/env.js';
import errorHandler from './utils/errorHandler.js';
import notFoundHandler from './utils/notFoundHandler.js';

const setupServer = () => {
  const app = express();
  const PORT = Number(env('PORT', 3000));
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(logger);

  app.use('/', router);
  app.use('/api-docs', swaggerDocs());

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
