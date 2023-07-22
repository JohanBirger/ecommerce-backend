import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckOutProps } from './schema/checkout.interface';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('/init')
  async create(@Body() checkoutData: CheckOutProps) {
    return await this.checkoutService.createCheckout(checkoutData);
  }

 
  @Get('/:id')
  async getOrders(@Param('id') userId: string){
    console.log(userId)
    const checkouts = await this.checkoutService.getCheckoutByUserId(userId);
    console.log(checkouts)
    return checkouts;
  }

  
 
}
