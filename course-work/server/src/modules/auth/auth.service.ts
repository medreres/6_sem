import {
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { Response } from 'express';

import { Auth as EnvAuth } from '@/configuration';

import { UserInstance } from '../user/types';
import { UserService } from '../user/user.service';

import { Auth, GeneralResponse, Token } from './dto';
import { AuthErrors } from './errors';
import { AuthTokens } from './types';
import { clearCookies, setCookies } from './utils';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvAuth, true>,
    private readonly userService: UserService,
  ) {}

  async login(res: Response, user: UserInstance): Promise<GeneralResponse> {
    const tokens = await this.signTokens({
      ...user,
    });

    this.logger.verbose('Updating user refresh token.');
    await user.updateRefreshToken(tokens.refreshToken);

    setCookies(
      res,
      tokens.accessToken,
      this.configService.get('ACCESS_TOKEN_DURATION'),
      tokens.refreshToken,
      this.configService.get('REFRESH_TOKEN_DURATION'),
    );

    return {
      message: 'Logged in successfully.',
    };
  }

  async register(
    res: Response,
    { email, password }: Auth,
  ): Promise<GeneralResponse> {
    const hashedPassword = await this.hash(password);

    const newUser = await this.userService.createUser({
      email: email,
      password: hashedPassword,
    });

    if (newUser.error || !newUser.data) {
      console.log(newUser.error);
      this.logger.error(AuthErrors.CREDENTIALS_TAKEN);
      throw new ForbiddenException(AuthErrors.CREDENTIALS_TAKEN);
    }

    const tokens = await this.signTokens({
      id: newUser.data.id,
      email: newUser.data.email,
      cities: newUser.data.cities,
    });

    this.logger.verbose('Updating user refresh token.');

    await newUser.data!.updateRefreshToken(tokens.refreshToken);

    setCookies(
      res,
      tokens.accessToken,
      this.configService.get('ACCESS_TOKEN_DURATION'),
      tokens.refreshToken,
      this.configService.get('REFRESH_TOKEN_DURATION'),
    );

    return {
      message: 'Registered successfully!',
    };
  }

  async logout(res: Response, userId: number): Promise<GeneralResponse> {
    const user = await this.userService.getUserById(userId);

    this.logger.verbose('Clearing user refresh token.');

    await user.data!.updateRefreshToken();

    clearCookies(res);

    return {
      message: 'Signed out successfully',
    };
  }

  async refreshToken(
    res: Response,
    userId: number,
    refreshToken: string,
  ): Promise<GeneralResponse> {
    this.logger.verbose('Refreshing user tokens.');
    const user = await this.userService.getUserById(userId);

    if (user.error || !user.data?.hashedRefreshToken) {
      throw new UnauthorizedException(AuthErrors.UNAUTHORIZED);
    }

    const hashesMatch = await compare(
      refreshToken,
      user.data.hashedRefreshToken,
    );

    if (!hashesMatch) {
      throw new UnauthorizedException(AuthErrors.UNAUTHORIZED);
    }

    const tokens = await this.signTokens({ ...user.data });

    this.logger.verbose('Updating user refresh token.');
    await user.data!.updateRefreshToken(tokens.refreshToken);

    setCookies(
      res,
      tokens.accessToken,
      this.configService.get('ACCESS_TOKEN_DURATION'),
      tokens.refreshToken,
      this.configService.get('REFRESH_TOKEN_DURATION'),
    );

    return {
      message: 'Tokens refreshed successfully.',
    };
  }

  async signTokens(data: Token): Promise<AuthTokens> {
    this.logger.debug('Signing tokens.');

    const payload = {
      id: data.id,
      email: data.email,
      cities: data.cities,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('ACCESS_TOKEN_DURATION'),
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('REFRESH_TOKEN_DURATION'),
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
    });

    return { accessToken, refreshToken };
  }

  async validateUser({ email, password }: Auth): Promise<UserInstance | null> {
    const { data, error } = await this.userService.getUserByEmail(email);

    if (!data || error) {
      this.logger.error(error);
      return null;
    }

    const passwordMatches = await data.passwordMatches(password);

    if (!passwordMatches) {
      this.logger.error(AuthErrors.MISMATCHING_PASSWORDS);
      return null;
    }

    return data;
  }

  private async hash(data: string): Promise<string> {
    return hash(data, this.configService.get('SALT_ROUNDS'));
  }
}
