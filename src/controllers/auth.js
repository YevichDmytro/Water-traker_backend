import { ONE_DAY } from '../constants/index.js';
import {
  loginOrRegisterWithGoogle,
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
} from '../services/auth.js';
import { generateAuthUrl } from '../utils/googleOAuth2.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const registerUserController = async (req, res) => {
  const data = await registerUser(req.body);
  const { user, session } = data;

  setupSession(res, session);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      accessToken: session.accessToken,
      user: user,
    },
  });
};

export const loginUserController = async (req, res) => {
  const data = await loginUser(req.body);
  const { user, session } = data;

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
      user: user,
    },
  });
};

export const logoutUserController = async (req, res) => {
  const { sessionId } = req.cookies;
  if (typeof sessionId === 'string') {
    await logoutUser(sessionId);
  }

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;
  const session = await refreshUserSession({
    sessionId,
    refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const getOAuthUrl = async (req, res, next) => {
  const url = generateAuthUrl();

  res.send({
    status: 200,
    message: 'Successfully get Google OAuth Url',
    data: { url },
  });
};

export const loginWithGoogle = async (req, res, next) => {
  const { code } = req.body;
  const session = await loginOrRegisterWithGoogle(code);
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.status(200).send({
    status: 200,
    message: 'Successfully logged in with Google!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
