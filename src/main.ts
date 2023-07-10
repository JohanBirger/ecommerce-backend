import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { connectDB } from './database'; // Import the function to establish the database connection

async function bootstrap() {
  await connectDB(); // Establish the database connection

  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: 'https://ecommerce-gules-two.vercel.app', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  };

  app.enableCors(corsOptions);

  await app.listen(3000);
}

bootstrap();