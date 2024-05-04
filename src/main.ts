import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'
import { useSwagger } from './common/swagger/swagger';
import { TranformInterceptor } from './common/interceptors/transform.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static('.'))
  app.enableCors()
  const reflector = app.get(Reflector)
  app.useGlobalInterceptors(new TranformInterceptor(reflector))
  useSwagger(app)
  await app.listen(8080);
}
bootstrap();
