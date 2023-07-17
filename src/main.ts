import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { connectDB } from './database'; // Import the function to establish the database connection
import 'dotenv/config';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { urlencoded, json } from 'express';
dotenv.config();

async function bootstrap() {
  
  
  await connectDB(); // Establish the database connection
  
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const corsOptions: CorsOptions = {
    origin: process.env.FRONTEND_URL, // Replace with your frontend URL 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  };

  app.enableCors(corsOptions);
  app.use(cookieParser());

  await app.listen(3000);
}

bootstrap();