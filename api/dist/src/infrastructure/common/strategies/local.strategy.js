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
exports.LocalStrategy = void 0;
const passport_local_1 = require("passport-local");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const login_usecases_1 = require("../../../app/usecases/auth/login.usecases");
const logger_service_1 = require("../../logger/logger.service");
const exceptions_service_1 = require("../../exceptions/exceptions.service");
let LocalStrategy = class LocalStrategy extends passport_1.PassportStrategy(passport_local_1.Strategy) {
    constructor(loginUsecaseProxy, logger, exceptionService) {
        super();
        this.loginUsecaseProxy = loginUsecaseProxy;
        this.logger = logger;
        this.exceptionService = exceptionService;
    }
    async validate(username, password) {
        if (!username || !password) {
            this.logger.warn('LocalStrategy', 'Username or password is missing, BadRequestException');
            this.exceptionService.UnauthorizedException();
        }
        const user = await this.loginUsecaseProxy.validateUserForLocalStragtegy(username, password);
        if (!user) {
            this.logger.warn('LocalStrategy', 'Invalid username or password');
            this.exceptionService.UnauthorizedException({ message: 'Invalid username or password.' });
        }
        return user;
    }
};
LocalStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [login_usecases_1.LoginUseCases,
        logger_service_1.LoggerService,
        exceptions_service_1.ExceptionsService])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;
//# sourceMappingURL=local.strategy.js.map