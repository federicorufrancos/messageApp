import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//instance framework to create the api
//appmodule is the main module as angular does
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
