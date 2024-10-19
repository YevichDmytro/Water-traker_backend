import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
import { initMongoConnections } from './db/initMongoConnections.js';
import setupServer from './server.js';
import { createDirIfNotExist } from './utils/createDirIfNotExists.js';

const bootstrap = async () => {
  await initMongoConnections();
  await createDirIfNotExist(TEMP_UPLOAD_DIR);
  await createDirIfNotExist(UPLOAD_DIR);
  setupServer();
};

bootstrap();
