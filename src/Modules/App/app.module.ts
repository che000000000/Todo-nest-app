import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/config/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from 'src/models/todo';
import { User } from 'src/models/user';
import { UsersModule } from '../users/users.module';
import { TodosModule } from '../todos/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('db.host'),
        port: configService.get('db.port'),
        username: configService.get('db.username'),
        database: configService.get('db.dbname'),
        password: configService.get('db.password'),
        synchronize: true,
        autoLoadModels: true,
        models: [Todo, User]
      })
    }),
    UsersModule, TodosModule 
  ], 
})
export class AppModule { }