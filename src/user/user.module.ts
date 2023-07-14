import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SendgridService } from '../utils/sendgrid.service';
import { ConfigModule } from '@nestjs/config';
import { CryptoService } from '../utils/crypto/crypto.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  providers: [UserService,SendgridService,CryptoService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}