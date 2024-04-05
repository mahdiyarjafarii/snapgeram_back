import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors:true
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });

    //Handling static pictures
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(3001);
}
bootstrap();
