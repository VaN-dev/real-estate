"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const logger_module_1 = require("./infrastructure/logger/logger.module");
const exceptions_module_1 = require("./infrastructure/exceptions/exceptions.module");
const bcrypt_module_1 = require("./infrastructure/services/bcrypt/bcrypt.module");
const jwt_module_1 = require("./infrastructure/services/jwt/jwt.module");
const environment_config_module_1 = require("./infrastructure/config/environment-config/environment-config.module");
const local_strategy_1 = require("./infrastructure/common/strategies/local.strategy");
const jwt_strategy_1 = require("./infrastructure/common/strategies/jwt.strategy");
const jwtRefresh_strategy_1 = require("./infrastructure/common/strategies/jwtRefresh.strategy");
const login_usecases_1 = require("./app/usecases/auth/login.usecases");
const isAuthenticated_usecases_1 = require("./app/usecases/auth/isAuthenticated.usecases");
const logout_usecases_1 = require("./app/usecases/auth/logout.usecases");
const list_usecase_1 = require("./app/usecases/property/list.usecase");
const read_usecase_1 = require("./app/usecases/property/read.usecase");
const create_usecase_1 = require("./app/usecases/property/create.usecase");
const delete_usecase_1 = require("./app/usecases/property/delete.usecase");
const update_usecase_1 = require("./app/usecases/property/update.usecase");
const property_controller_1 = require("./infrastructure/controllers/property/property.controller");
const property_repository_1 = require("./infrastructure/repositories/property.repository");
const property_entity_1 = require("./infrastructure/entities/property.entity");
const typeorm_module_1 = require("./infrastructure/config/typeorm/typeorm.module");
const logger_service_1 = require("./infrastructure/logger/logger.service");
const useCases = [
    login_usecases_1.LoginUseCases,
    isAuthenticated_usecases_1.IsAuthenticatedUseCases,
    logout_usecases_1.LogoutUseCases,
    {
        inject: [property_repository_1.DatabasePropertyRepository],
        provide: list_usecase_1.default,
        useFactory: (propertyRepository) => new list_usecase_1.default(propertyRepository),
    },
    {
        inject: [property_repository_1.DatabasePropertyRepository],
        provide: read_usecase_1.default,
        useFactory: (propertyRepository) => new read_usecase_1.default(propertyRepository),
    },
    {
        inject: [logger_service_1.LoggerService, property_repository_1.DatabasePropertyRepository],
        provide: create_usecase_1.default,
        useFactory: (logger, propertyRepository) => new create_usecase_1.default(logger, propertyRepository),
    },
    {
        inject: [logger_service_1.LoggerService, property_repository_1.DatabasePropertyRepository],
        provide: update_usecase_1.default,
        useFactory: (logger, propertyRepository) => new update_usecase_1.default(logger, propertyRepository),
    },
    {
        inject: [logger_service_1.LoggerService, property_repository_1.DatabasePropertyRepository],
        provide: delete_usecase_1.default,
        useFactory: (logger, propertyRepository) => new delete_usecase_1.default(logger, propertyRepository),
    },
];
const repositories = [
    property_repository_1.DatabasePropertyRepository,
];
const entities = [
    property_entity_1.Property,
];
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.secret,
            }),
            logger_module_1.LoggerModule,
            exceptions_module_1.ExceptionsModule,
            bcrypt_module_1.BcryptModule,
            jwt_module_1.JwtModule,
            environment_config_module_1.EnvironmentConfigModule,
            typeorm_module_1.TypeOrmConfigModule,
            typeorm_1.TypeOrmModule.forFeature(entities),
        ],
        providers: [
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            jwtRefresh_strategy_1.JwtRefreshTokenStrategy,
            ...useCases,
            ...repositories,
        ],
        controllers: [
            property_controller_1.PropertyController,
        ],
        exports: [
            ...repositories,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map