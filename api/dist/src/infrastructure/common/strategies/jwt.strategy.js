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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const login_usecases_1 = require("../../../app/usecases/auth/login.usecases");
const exceptions_service_1 = require("../../exceptions/exceptions.service");
const logger_service_1 = require("../../logger/logger.service");
let JwtStrategy = class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {
    constructor(loginUsecaseProxy, logger, exceptionService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => { var _a; return (_a = request === null || request === void 0 ? void 0 : request.cookies) === null || _a === void 0 ? void 0 : _a.Authentication; },
            ]),
            secretOrKey: process.env.JWT_SECRET,
        });
        this.loginUsecaseProxy = loginUsecaseProxy;
        this.logger = logger;
        this.exceptionService = exceptionService;
    }
    async validate(payload) {
        const user = this.loginUsecaseProxy.validateUserForJWTStragtegy(payload.username);
        if (!user) {
            this.logger.warn('JwtStrategy', 'User not found');
            this.exceptionService.UnauthorizedException({ message: 'User not found' });
        }
        return user;
    }
};
JwtStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [login_usecases_1.LoginUseCases,
        logger_service_1.LoggerService,
        exceptions_service_1.ExceptionsService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map