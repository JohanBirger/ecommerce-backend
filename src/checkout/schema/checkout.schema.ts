import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes } from 'mongoose';
import { Cart } from '../../cart/schemas/cart.schema';
import { Item, ItemSchema } from 'src/cart/schemas/item.schema';

export type CheckoutDocument = Checkout & Document;

@Schema()
export class Checkout {
  @Prop({ type: SchemaTypes.Mixed, ref: 'User' })
  userId: string;

  @Prop({type: [ItemSchema]})
  items: Item[];
  
  @Prop({type: Number})
  totalPrice: Number;

  @Prop({ type: Number })
  discount?: number;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true })
  txHash: string;
}

export const CheckoutSchema = SchemaFactory.createForClass(Checkout);
