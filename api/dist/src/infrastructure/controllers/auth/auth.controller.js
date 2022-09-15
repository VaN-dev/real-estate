"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_dto_class_1 = require("./auth-dto.class");
const auth_presenter_1 = require("./auth.presenter");
const jwtRefresh_guard_1 = require("../../common/guards/jwtRefresh.guard");
const jwtAuth_guard_1 = require("../../common/guards/jwtAuth.guard");
const login_guard_1 = require("../../common/guards/login.guard");
const login_usecases_1 = require("../../../app/usecases/auth/login.usecases");
const isAuthenticated_usecases_1 = require("../../../app/usecases/auth/isAuthenticated.usecases");
const logout_usecases_1 = require("../../../app/usecases/auth/logout.usecases");
const response_decorator_1 = require("../../common/swagger/response.decorator");
let AuthController = class AuthController {
    constructor(loginUsecaseProxy, logoutUsecaseProxy, isAuthUsecaseProxy) {
        this.loginUsecaseProxy = loginUsecaseProxy;
        this.logoutUsecaseProxy = logoutUsecaseProxy;
        this.isAuthUsecaseProxy = isAuthUsecaseProxy;
    }
    async login(auth, request) {
        const accessTokenCookie = await this.loginUsecaseProxy.getCookieWithJwtToken(auth.username);
        const refreshTokenCookie = await this.loginUsecaseProxy.getCookieWithJwtRefreshToken(auth.username);
        request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
        return 'Login successful';
    }
    async logout(request) {
        const cookie = await this.logoutUsecaseProxy.execute();
        request.res.setHeader('Set-Cookie', cookie);
        return 'Logout successful';
    }
    async isAuthenticated(request) {
        const user = await this.isAuthUsecaseProxy.execute(request.user.username);
        const response = new auth_presenter_1.IsAuthPresenter();
        response.username = user.username;
        return response;
    }
    async refresh(request) {
        const accessTokenCookie = await this.loginUsecaseProxy.getCookieWithJwtToken(request.user.username);
        request.res.setHeader('Set-Cookie', accessTokenCookie);
        return 'Refresh successful';
    }
};
__decorate([
    common_1.Post('login'),
    common_1.UseGuards(login_guard_1.LoginGuard),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiBody({ type: auth_dto_class_1.AuthLoginDto }),
    swagger_1.ApiOperation({ description: 'login' }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_class_1.AuthLoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Post('logout'),
    common_1.UseGuards(jwtAuth_guard_1.JwtAuthGuard),
    swagger_1.ApiOperation({ description: 'logout' }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    common_1.Get('is_authenticated'),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwtAuth_guard_1.JwtAuthGuard),
    swagger_1.ApiOperation({ description: 'is_authenticated' }),
    response_decorator_1.ApiResponseType(auth_presenter_1.IsAuthPresenter, false),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "isAuthenticated", null);
__decorate([
    common_1.Get('refresh'),
    common_1.UseGuards(jwtRefresh_guard_1.default),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    swagger_1.ApiTags('auth'),
    swagger_1.ApiResponse({
        status: 401,
        description: 'No authorization token was found',
    }),
    swagger_1.ApiResponse({ status: 500, description: 'Internal error' }),
    swagger_1.ApiExtraModels(auth_presenter_1.IsAuthPresenter),
    __metadata("design:paramtypes", [login_usecases_1.LoginUseCases,
        logout_usecases_1.LogoutUseCases,
        isAuthenticated_usecases_1.IsAuthenticatedUseCases])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map