import { Controller, Post, Body, Request, UseGuards, Delete, NotFoundException, Param, Get, Put} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CartService } from './cart.service';
import { ItemDTO } from './dtos/item.dto';
import { AuthService } from '../auth/auth.service';

@Controller('cart')

export class CartController {
  constructor(private cartService: CartService,  private readonly authService : AuthService)
  { }



  @Get('/')
  async getCart(@Request() req) {
      const jwtUser = this.authService.decodeJwt(req.headers.authorization);
      const userId = jwtUser?.sub; // Get the userId from the decoded JWT token // decode JWT token
      console.log(userId)
      if(userId){
        const cart = await this.cartService.getCart(userId);
        return cart;
      }
      const visitor_token = req.cookies.visitor_token;
      console.log(visitor_token)
      if (visitor_token){
        const cart = await this.cartService.getCart(visitor_token);
        return cart;
      }
  }

  @Get('/:id')
  async getCartById(@Param('id') cartId:string) {
      
      if(cartId){
        const cart = await this.cartService.getCartById(cartId);
        console.log('controller.getCartById',cart)
        return cart;
      }
      return null;
  }


  @Roles(Role.User)
  @Get('/count')
  async getCartCount(@Request() req) {
    const userId = req.user.userId;
    const cartCount = await this.cartService.getCart(userId);
    return cartCount;
  }

  
  @Post('/')
  async addItemToCart(@Request() req, @Body() itemDTO: ItemDTO) {
    const jwtUser = this.authService.decodeJwt(req.headers.authorization);
    const userId = jwtUser?.sub; // Get the userId from the decoded JWT token // decode JWT token
    console.log(userId)
    if (userId){
      const cart = await this.cartService.addItemToCart(userId, itemDTO);
      return cart;
    }
    const visitor_token = req.cookies.visitor_token;
    if (visitor_token){
      const cart = await this.cartService.addItemToCart(visitor_token, itemDTO);
      return cart;
    }
      
}

  

  @Delete('/')
  async removeItemFromCart(@Request() req, @Body() { productId }) {
    
    const jwtUser = this.authService.decodeJwt(req.headers.authorization);
    const userId = jwtUser?.sub; // Get the userId from the decoded JWT token // decode JWT token
    console.log(userId)
    if(userId){
      const cart = await this.cartService.removeItemFromCart(userId, productId);
    if (cart === 'Cart Deleted') return null;
    if (!cart) throw new NotFoundException('Item does not exist');
    return cart;
    }
    const visitor_token = req.cookies.visitor_token;
    console.log(visitor_token)
    if (visitor_token){
      const cart = await this.cartService.removeItemFromCart(visitor_token, productId);
    if (cart === 'Cart Deleted') return null;
    if (!cart) throw new NotFoundException('Item does not exist');
    return cart;
    }  
    
  }

  

  @Put('/')
  async updateItemQuantityInCart(@Request() req, @Body() { productId, quantity }) {
    const jwtUser = this.authService.decodeJwt(req.headers.authorization);
    const userId = jwtUser?.sub; // Get the userId from the decoded JWT token // decode JWT token
    console.log(userId)
    if (userId){
      const cart = await this.cartService.updateItemQuantityInCart(userId, productId, quantity);
      if (!cart) throw new NotFoundException('Item does not exist');
      return cart;
    }
    const visitor_token = req.cookies.visitor_token;
    if (visitor_token){
      
      const cart = await this.cartService.updateItemQuantityInCart(visitor_token, productId, quantity);
      if (!cart) throw new NotFoundException('Item does not exist');
      return cart;
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