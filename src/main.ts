import { NestFactory } from '@nestjs/core';
import { AppModule } from './Modules/App/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService) 
  await app.listen(configService.get("appPort") ?? 3000)
}
bootstrap()