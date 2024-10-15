import { initMongoConnections } from './db/initMongoConnections.js';
import setupServer from './server.js';

const bootstrap = async () => {
  await initMongoConnections();
  setupServer();
};

bootstrap();
