import cors from 'cors';
import express from 'express';
import pino from 'pino-http';

import userRoutes from './routers/user.js';
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
  app.use(logger);

  app.use('/user', userRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
