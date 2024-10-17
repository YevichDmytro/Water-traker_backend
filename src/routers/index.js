import { Router } from 'express';
import authRouter from './auth.js';
import usersRouter from './user.js';

const router = Router();

router.use('/users', usersRouter);

router.use('/auth', authRouter);

export default router;
