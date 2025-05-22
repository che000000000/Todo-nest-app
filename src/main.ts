import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import IORedis from 'ioredis'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import * as connectRedis from 'connect-redis'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)

  const redisUri = configService.get('redis.uri')
  if (!redisUri) throw new Error('Redis URI is not configured')
  const redisClient = new IORedis(redisUri)

  const redisStore = new connectRedis.RedisStore({
    client: redisClient,
    prefix: configService.get('session.folder') || ':sessions'
  })

  app.use(
    cookieParser(configService.get('session.cookiesSecret') || "secret"),
    session({
      store: redisStore,
      secret: configService.get('session.sessionSecret') || 'secret',
      name: configService.get('session.name') || 'secret',
      resave: true,
      saveUninitialized: false,
      cookie: {
        domain: configService.get('session.domain') || "localhost",
        maxAge: 86400 * 1000,
        httpOnly: configService.get('session.httpOnly') || true, 
        secure: configService.get('session.secure') || false,
        sameSite: 'lax'
      },
    })
  )

  app.enableCors({
    origin: configService.get('allowedOrigin'),
    credentials: true,
    exposedHeaders: ['set-cookie']
  })

  const appPort = configService.get('app.port') || 6870
  await app.listen(appPort).then(
    () => console.log(`App working on port - ${appPort}.`)
  )
}
bootstrap()