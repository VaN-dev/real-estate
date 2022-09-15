import {
  Body, Controller, Get, Inject, Post, Req, Request, UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiBody, ApiExtraModels, ApiOperation, ApiResponse, ApiTags,
} from '@nestjs/swagger';

import { AuthLoginDto } from './auth-dto.class';
import { IsAuthPresenter } from './auth.presenter';

import JwtRefreshGuard from '../../common/guards/jwtRefresh.guard';
import { JwtAuthGuard } from '../../common/guards/jwtAuth.guard';
import { LoginGuard } from '../../common/guards/login.guard';

// import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
// import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { LoginUseCases } from '../../../app/usecases/auth/login.usecases';
import { IsAuthenticatedUseCases } from '../../../app/usecases/auth/isAuthenticated.usecases';
import { LogoutUseCases } from '../../../app/usecases/auth/logout.usecases';

import { ApiResponseType } from '../../common/swagger/response.decorator';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(IsAuthPresenter)
export class AuthController {
  constructor(
    // @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: LoginUseCases,
    // @Inject(UsecasesProxyModule.LOGOUT_USECASES_PROXY)
    private readonly logoutUsecaseProxy: LogoutUseCases,
    // @Inject(UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY)
    private readonly isAuthUsecaseProxy: IsAuthenticatedUseCases,
  ) {}

  @Post('login')
  @UseGuards(LoginGuard)
  @ApiBearerAuth()
  @ApiBody({ type: AuthLoginDto })
  @ApiOperation({ description: 'login' })
  async login(@Body() auth: AuthLoginDto, @Request() request: any) {
    const accessTokenCookie = await this.loginUsecaseProxy.getCookieWithJwtToken(auth.username);
    const refreshTokenCookie = await this.loginUsecaseProxy.getCookieWithJwtRefreshToken(auth.username);
    request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
    return 'Login successful';
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'logout' })
  async logout(@Request() request: any) {
    const cookie = await this.logoutUsecaseProxy.execute();
    request.res.setHeader('Set-Cookie', cookie);
    return 'Logout successful';
  }

  @Get('is_authenticated')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'is_authenticated' })
  @ApiResponseType(IsAuthPresenter, false)
  async isAuthenticated(@Req() request: any) {
    const user = await this.isAuthUsecaseProxy.execute(request.user.username);
    const response = new IsAuthPresenter();
    response.username = user.username;
    return response;
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth()
  async refresh(@Req() request: any) {
    const accessTokenCookie = await this.loginUsecaseProxy.getCookieWithJwtToken(request.user.username);
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return 'Refresh successful';
  }
}
