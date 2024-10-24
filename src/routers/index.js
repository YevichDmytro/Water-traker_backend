import { Router } from 'express';

import authRouter from './auth.js';
import usersRouter from './user.js';

const router = Router();

router.use('/user', usersRouter);

router.use('/auth', authRouter);

export default router;
