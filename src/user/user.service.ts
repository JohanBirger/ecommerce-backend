import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDTO } from './dtos/create-user.dto';
import { Role } from '../auth/enums/role.enum';
import * as bcrypt from 'bcrypt';
import {CryptoService} from '../utils/crypto/crypto.service';
import 'dotenv/config'








@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private readonly cryptoService : CryptoService
  ) { }

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    if (createUserDTO.password.length < 8){
      throw new Error('Password must be atleast 8 characters');
    }
    const newUser = await this.userModel.create(createUserDTO);
    
    newUser.password = await bcrypt.hash(newUser.password, 10);
    newUser.roles.push(Role.User);
    return newUser.save();  
  }

  async findUser(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({email: email});
    if(!user){
      throw new HttpException("Email Not Found",HttpStatus.NOT_FOUND)
    }
    return user;
  }

  async getUserId(email: string): Promise<number> {
    console.log("service.getUserId")
    const user = await this.userModel.findOne({email: email});
    if(!user){
      throw new HttpException("Email Not Found",HttpStatus.NOT_FOUND)
    }
    return user.id;
  }

  async getUserById(id_: string): Promise<User | undefined> {
    console.log("service.getUserById")
    console.log(id_)
    const user = await this.userModel.findById(id_);
    console.log(user)
    if(!user){
      throw new HttpException("User Not Found",HttpStatus.NOT_FOUND)
    }
    return user;
  }

  

  async updateUserResetToken(userId: string): Promise<void> {
    console.log('service.updateUserResetToken')
    const resetToken = await this.cryptoService.generateToken();
    await this.userModel.updateOne({ _id: userId }, { $set: { resetToken } });
  }

  async findByResetToken(resetToken: string): Promise<User|undefined>{
    console.log('service.findByResetToken')
    const user = await this.userModel.findOne({resetToken: resetToken});
    if(!user){
      throw new HttpException("User Not Found",HttpStatus.NOT_FOUND);
    }
    return user;
  }
  async updateUserPassword(resetToken: string, password:string): Promise<void>{
    console.log('service.findByResetToken')
    const hashedPassword =  await bcrypt.hash(password, 10);
    await this.userModel.updateOne({ resetToken: resetToken }, { $set: { password: hashedPassword } });
  
  }

  

}