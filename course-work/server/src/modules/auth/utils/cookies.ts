import { Request, Response } from 'express';

export const setCookies = (
  res: Response,
  accessToken: string,
  accessTokenAge: number,
  refreshToken: string,
  refreshTokenAge: number,
): void => {
  res
    .cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: accessTokenAge,
    })
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: refreshTokenAge,
    });
};

export const clearCookies = (res: Response): void => {
  res.clearCookie('accessToken').clearCookie('refreshToken');
};

export const cookieExtractor = (req: Request, name: string): string => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies[name];
  }

  return jwt;
};
