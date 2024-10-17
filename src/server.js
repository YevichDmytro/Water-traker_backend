import cors from 'cors';
import express from 'express';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';
import { env } from './utils/env.js';

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

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
