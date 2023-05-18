import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { tokenService } from '../token';
import { userService } from '../user';
import * as authService from './auth.service';

export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.registerUser(req.body);
  res.status(httpStatus.CREATED).send({ user });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.loginUser(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  const queryParams = {
    userId: user._id,
    token: tokens.access.token
  };
  const queryString = new URLSearchParams(queryParams);
  res.send({
    redirectUrl: `https://test-audit-back.onrender.com/signin?${queryString.toString()}` 
  })
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});
