import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { User } from '../entities/user.entity';
import { DatabaseUserRepository } from './user.repository';
import { DatabasePropertyRepository } from './property.repository';
import { Property } from '../entities/property.entity';

const repositories = [
  DatabasePropertyRepository,
  // DatabaseUserRepository,
];

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([
    // Todo,
    Property,
    // User
  ])],
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoriesModule {}
