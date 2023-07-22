import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckoutSchema } from './schema/checkout.schema';
import { CartSchema } from 'src/cart/schemas/cart.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Checkout', schema: CheckoutSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: CartSchema }]),
  ],
  providers: [CheckoutService],
  controllers: [CheckoutController]
})
export class CheckoutModule {}
