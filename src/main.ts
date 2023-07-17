import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { connectDB } from './database'; // Import the function to establish the database connection
import 'dotenv/config';
import * as dotenv from 'dotenv';
import { ConfigService } from "@nestjs/config";
import * as cookieParser from 'cookie-parser';
import { urlencoded, json } from 'express';

dotenv.config();

async function bootstrap() {
  
  
  await connectDB();
  
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  const frontend = await configService.get<string>('FRONTEND_COOKIES');
  console.log(frontend)

  const corsOptions: CorsOptions = {
    origin: frontend,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization,Access-Control-Allow-Credentials',
    
  };

  app.enableCors(corsOptions);
  app.use(cookieParser());

  await app.listen(3000);
}

bootstrap();