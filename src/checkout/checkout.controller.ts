import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckOutProps } from './schema/checkout.interface';
import { SendgridService } from 'src/utils/sendgrid.service';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService, private readonly sendgridService: SendgridService) {}

  @Post('/init')
  async create(@Body() checkoutData: CheckOutProps) {
    return await this.checkoutService.createCheckout(checkoutData);
  }

  @Post('/:id/sendorder')
  async sendOrder(@Param('id') userId:string, @Body() checkoutData: CheckOutProps){
    return await this.sendgridService.sendOrder(userId,checkoutData);
  }
 
  @Get('/:id')
  async getOrders(@Param('id') userId: string){
    console.log(userId)
    const checkouts = await this.checkoutService.getCheckoutByUserId(userId);
    console.log(checkouts)
    return checkouts;
  }

  
 
}
