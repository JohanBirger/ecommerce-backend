import { Controller, Post, Body, Request, UseGuards, Delete, NotFoundException, Param, Get, Put} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CartService } from './cart.service';
import { ItemDTO } from './dtos/item.dto';

@Controller('cart')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CartController {
  constructor(private cartService: CartService) { }


  @Roles(Role.User)
  @Get('/')
  async getCart(@Request() req) {
    const userId = req.user.userId;
    const cart = await this.cartService.getCart(userId);
    return cart;
  }


  @Roles(Role.User)
  @Get('/count')
  async getCartCount(@Request() req) {
    const userId = req.user.userId;
    const cartCount = await this.cartService.getCart(userId);
    return cartCount;
  }


  @Roles(Role.User)
  @Post('/')
  async addItemToCart(@Request() req, @Body() itemDTO: ItemDTO) {
    const userId = req.user.userId;
    const cart = await this.cartService.addItemToCart(userId, itemDTO);
    return cart;
  }


  @Roles(Role.User)
  @Delete('/')
  async removeItemFromCart(@Request() req, @Body() { productId }) {
    const userId = req.user.userId;
    console.log(userId,productId)
    
    const cart = await this.cartService.removeItemFromCart(userId, productId);
    if (!cart) throw new NotFoundException('Item does not exist');
    return cart;
  }

  
  @Roles(Role.User)
  @Put('/')
  async updateItemQuantityInCart(@Request() req, @Body() { productId, quantity }) {
    const userId = req.user.userId;
    console.log(userId,productId)
    try{
      const cart = await this.cartService.updateItemQuantityInCart(userId, productId, quantity);
      if (!cart) throw new NotFoundException('Item does not exist');
      return cart;
    } catch (error){
      throw new Error("Unhandled error")
    }
  }

  @Roles(Role.User)
  @Delete('/:id')
  async deleteCart(@Param('id') userId: string) {
    const cart = await this.cartService.deleteCart(userId);
    if (!cart) throw new NotFoundException('Cart does not exist');
    return cart;
  }
}