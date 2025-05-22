import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/config/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from 'src/models/todo';
import { User } from 'src/models/user';
import { UsersModule } from '../users/users.module';
import { TodosModule } from '../todos/todos.module';
import { Account } from 'src/models/account';
import { Token } from 'src/models/token';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const connectConfig = {
          host: configService.get('db.host'),
          port: configService.get('db.port'),
          username: configService.get('db.username'),
          database: configService.get('db.dbname'),
          password: configService.get('db.password'),
        }
        if (!connectConfig.host || !connectConfig.port || !connectConfig.username || !connectConfig.database || !connectConfig.password) {
          throw new Error("Failed connect to database. Missing connection params!")
        }
        return {
          ...connectConfig,
          dialect: 'postgres',
          synchronize: true,
          autoLoadModels: true,
          models: [Todo, User, Account, Token]
        }
      }
    }),
    UsersModule, TodosModule, AuthModule
  ],
})
export class AppModule { }