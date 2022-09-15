import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { BcryptModule } from './infrastructure/services/bcrypt/bcrypt.module';
import { JwtModule as JwtServiceModule } from './infrastructure/services/jwt/jwt.module';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { LocalStrategy } from './infrastructure/common/strategies/local.strategy';
import { JwtStrategy } from './infrastructure/common/strategies/jwt.strategy';
import { JwtRefreshTokenStrategy } from './infrastructure/common/strategies/jwtRefresh.strategy';
import { LoginUseCases } from './app/usecases/auth/login.usecases';
import { IsAuthenticatedUseCases } from './app/usecases/auth/isAuthenticated.usecases';
import { LogoutUseCases } from './app/usecases/auth/logout.usecases';
import ListPropertiesUseCase from './app/usecases/property/list.usecase';
import ReadPropertyUseCase from './app/usecases/property/read.usecase';
import CreatePropertyUseCase from './app/usecases/property/create.usecase';
import DeletePropertyUseCase from './app/usecases/property/delete.usecase';
import UpdatePropertyUseCase from './app/usecases/property/update.usecase';
import { PropertyController } from './infrastructure/controllers/property/property.controller';
import { DatabasePropertyRepository } from './infrastructure/repositories/property.repository';
import { Property } from './infrastructure/entities/property.entity';
import { TypeOrmConfigModule } from './infrastructure/config/typeorm/typeorm.module';
import { LoggerService } from './infrastructure/logger/logger.service';

const useCases = [
  LoginUseCases,
  IsAuthenticatedUseCases,
  LogoutUseCases,
  {
    inject: [DatabasePropertyRepository],
    provide: ListPropertiesUseCase,
    useFactory: (propertyRepository: DatabasePropertyRepository) => new ListPropertiesUseCase(propertyRepository),
  },
  {
    inject: [DatabasePropertyRepository],
    provide: ReadPropertyUseCase,
    useFactory: (propertyRepository: DatabasePropertyRepository) => new ReadPropertyUseCase(propertyRepository),
  },
  {
    inject: [LoggerService, DatabasePropertyRepository],
    provide: CreatePropertyUseCase,
    useFactory: (logger: LoggerService, propertyRepository: DatabasePropertyRepository) => new CreatePropertyUseCase(logger, propertyRepository),
  },
  {
    inject: [LoggerService, DatabasePropertyRepository],
    provide: UpdatePropertyUseCase,
    useFactory: (logger: LoggerService, propertyRepository: DatabasePropertyRepository) => new UpdatePropertyUseCase(logger, propertyRepository),
  },
  {
    inject: [LoggerService, DatabasePropertyRepository],
    provide: DeletePropertyUseCase,
    useFactory: (logger: LoggerService, propertyRepository: DatabasePropertyRepository) => new DeletePropertyUseCase(logger, propertyRepository),
  },
];

const repositories = [
  DatabasePropertyRepository,
  // DatabaseUserRepository,
];

const entities = [
  // Todo,
  Property,
  // User
];

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.secret,
    }),
    LoggerModule,
    ExceptionsModule,
    BcryptModule,
    JwtServiceModule,
    EnvironmentConfigModule,
    TypeOrmConfigModule,
    TypeOrmModule.forFeature(entities),
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    ...useCases,
    ...repositories,
  ],
  controllers: [
    PropertyController,
    // AuthController,
  ],
  exports: [
    ...repositories,
  ],
})
export class AppModule {}
