import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { KafkaMicroserviceConfig } from 'config/kafka.microservice';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice(KafkaMicroserviceConfig);
  app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
