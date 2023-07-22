import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Import the mongoose module
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { SendgridService } from './utils/sendgrid.service';
import { ConfigModule } from '@nestjs/config';
import {CryptoModule} from './utils/crypto/crypto.module';
import { ImagesModule } from './images/images.module';
import { CheckoutModule } from './checkout/checkout.module';

import 'dotenv/config'

@Module({
  
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `mongodb+srv://johbirger:${process.env.MONGOKEY}@cluster0.ddwvlsd.mongodb.net/`,
      }),
    }),
    ProductModule,
    UserModule,
    AuthModule,
    CartModule,
    CryptoModule,
    ImagesModule,
    CheckoutModule,
    
  ],
  controllers: [AppController],
  providers: [AppService,SendgridService],
})
export class AppModule {}