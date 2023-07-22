import { Injectable } from '@nestjs/common';
import { Checkout, CheckoutDocument } from './schema/checkout.schema';
import {CheckOutProps} from './schema/checkout.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class CheckoutService {
    constructor(@InjectModel('Checkout') private readonly checkoutModel: Model<CheckoutDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>) { }

  async createCheckout(checkoutData: CheckOutProps) {
    console.log(checkoutData)
    const newCheckout = await this.checkoutModel.create(
        {
            userId: checkoutData.user,
            items: checkoutData.items,
            totalPrice: checkoutData.totalPrice,
            orderId: checkoutData.orderId,
            time: checkoutData.time,
            discount: checkoutData.discount,
            txHash:checkoutData.txHash,
        }
    );
   
    console.log('newCO',newCheckout)

   
    return newCheckout.save();
  }
  
  async getCheckoutByUserId(userId: string): Promise<CheckoutDocument[]> {
 
    const checkout = await this.checkoutModel.find({ userId: userId });
    console.log('get',checkout)
    //const cartIds = carts.map(cart => cart._id);
    //console.log(cartIds)
    //const checkout = await this.checkoutModel.findOne({ cart: { $in: cartIds } });
    //console.log(checkout)
    return checkout;
}
}
