import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { Router } from 'express';
const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper());
export default router;
