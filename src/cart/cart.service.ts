import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { ItemDTO } from './dtos/item.dto';


@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart') private readonly cartModel: Model<CartDocument>
   
    ) { }


  async createCart(userId: string, itemDTO: ItemDTO, subTotalPrice: number, totalPrice: number): Promise<Cart> {
    const newCart = await this.cartModel.create({
      userId,
      items: [{ ...itemDTO, subTotalPrice }],
      totalPrice,
    });
    return newCart;
  }

  async getCart(userId: string): Promise<CartDocument> {
    const cart = await this.cartModel.findOne({ userId });
    return cart;
  }

  async getCartById(cartId: string): Promise<CartDocument> {
    console.log('getCardById.service',cartId)
    const cart = await this.cartModel.findById({ _id: cartId });
    console.log('getCartbyId.serivce',cart)
    return cart;
  }

  async getCartCount(userId: string):Promise<Number> {
    const cart = await this.cartModel.findOne({ userId });
    return cart.items.length;
  }

  async deleteCart(userId: string): Promise<Cart> {
    const deletedCart = await this.cartModel.findOneAndRemove({ userId });
    return deletedCart;
  }

  private updateCartTotal(cart: CartDocument) {
    cart.totalPrice = cart.items.reduce((total, item) => total + item.subTotalPrice, 0);
   
  
  }
  
  async addItemToCart(userId: string, itemDTO: ItemDTO): Promise<Cart> {
    const { productId, quantity, price } = itemDTO;
    const subTotalPrice = quantity * price;
  
    const cart = await this.getCart(userId);
    //console.log(cart,userId)
  
    if (cart) {
      const itemIndex = cart.items.findIndex((item) => item.productId == productId);
  
      if (itemIndex > -1) {
        let item = cart.items[itemIndex];
        item.quantity += quantity;
        item.subTotalPrice = item.quantity * item.price;
  
        cart.items[itemIndex] = item;
      } else {
        cart.items.push({ ...itemDTO, subTotalPrice });
      }
      
      this.updateCartTotal(cart);
      return cart.save();
    } else {
      const newCart = await this.createCart(userId, itemDTO, subTotalPrice, price);
      return newCart;
    }
  }

  async updateItemQuantityInCart(userId: string, productId: string, quantity: number): Promise<any> {
    console.log(`Updating quantity for product ${productId} in cart for user ${userId} to ${quantity}`);
    const cart = await this.getCart(userId);

    const itemIndex = cart.items.findIndex((item) => item.productId == productId);
    console.log(cart.items)
    console.log(`Found product at index ${itemIndex}`);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      cart.items[itemIndex].subTotalPrice = cart.items[itemIndex].price * quantity;
      cart.markModified('items'); // <-- Add this line (Thank god for gpt)
      this.updateCartTotal(cart);
      
      console.log('Updated cart:', cart);
      return cart.save();
    }
    
  }
  

  async removeItemFromCart(userId: string, productId: string): Promise<any> {
    const cart = await this.getCart(userId);

    const itemIndex = cart.items.findIndex((item) => item.productId == productId);
    

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      this.updateCartTotal(cart);
      if (cart.items.length < 1) {
        this.deleteCart(userId);
        return 'Cart Deleted';
      }
      return cart.save();
    }

    

  }
}