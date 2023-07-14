import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CartSchema } from './schemas/cart.schema';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import {UserSchema} from '../user/schemas/user.schema'
import { CryptoService } from 'src/utils/crypto/crypto.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    
  ],
  controllers: [CartController],
  providers: [CartService,AuthService,UserService,JwtService,CryptoService]
})
export class CartModule {}