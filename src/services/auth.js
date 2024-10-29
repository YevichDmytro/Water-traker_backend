import { randomBytes } from 'crypto';

import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import { ONE_DAY, THIRTY_MINUTES } from '../constants/index.js';
import SessionsCollection from '../db/models/Sessions.js';
import UsersCollection from '../db/models/Users.js';
import { validateCode } from '../utils/googleOAuth2.js';

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  const nameFromEmail = payload.email.split('@')[0];

  const newUser = await UsersCollection.create({
    ...payload,
    name: nameFromEmail,
    password: encryptedPassword,
  });

  const login = await loginUser(payload);

  return {
    user: {
      name: newUser.name,
      email: newUser.email,
      gender: newUser.gender,
      waterRate: newUser.waterRate,
      photo: newUser.photo,
    },
    session: login.session,
  };
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  const session = await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + THIRTY_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });

  return {
    user: {
      name: user.name,
      email: user.email,
      gender: user.gender,
      waterRate: user.waterRate,
      photo: user.photo,
    },
    session,
  };
};

export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + THIRTY_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  await SessionsCollection.deleteOne({ _id: sessionId });

  return await SessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export async function loginOrRegisterWithGoogle(code) {
  const ticket = await validateCode(code);
  const payload = ticket.getPayload();

  if (typeof payload === 'undefined') {
    throw createHttpError(401, 'Unauthorized');
  }

  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    const password = await bcrypt.hash(randomBytes(30).toString('base64'), 10);
    const createUser = await UsersCollection.create({
      email: payload.email,
      name: payload.name,
      password,
    });

    return SessionsCollection.create({
      userId: createUser._id,
      accessToken: randomBytes(30).toString('base64'),
      refreshToken: randomBytes(30).toString('base64'),
      accessTokenValidUntil: new Date(Date.now() + THIRTY_MINUTES),
      refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
    });
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  return SessionsCollection.create({
    userId: user._id,
    accessToken: randomBytes(30).toString('base64'),
    refreshToken: randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + THIRTY_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
}

export const loginWithGoogle = async (req, res) => {
  const { code } = req.body;

  try {
    const session = await loginOrRegisterWithGoogle(code);
    res.status(200).json({
      status: 200,
      message: 'Successfully logged in or registered',
      data: {
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
      },
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
