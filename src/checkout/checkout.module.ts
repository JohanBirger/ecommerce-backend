import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckoutSchema } from './schema/checkout.schema';
import { CartSchema } from 'src/cart/schemas/cart.schema';
import { SendgridService } from '../utils/sendgrid.service';
import { ConfigModule } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { CryptoService } from 'src/utils/crypto/crypto.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'Checkout', schema: CheckoutSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: CartSchema }]),
    
  ],
  providers: [CheckoutService,SendgridService,UserService,CryptoService],
  controllers: [CheckoutController]
})
export class CheckoutModule {}
