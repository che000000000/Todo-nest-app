import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)
  const appPort = configService.get('app.port' ) || 6870
  await app.listen(appPort).then(
    () => console.log(`App working on port - ${appPort}.`)
  )
}
bootstrap()