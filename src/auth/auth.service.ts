import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface JwtPayload {
  username: string;
  sub: string;
  roles: string[];
}

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {} // 2

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUser(email);
  
    if(!user){
      throw new HttpException("Email Not Found",HttpStatus.NOT_FOUND)
    }
    
    if (user && user.password) { // Add null check for user and user.password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        return user;
      }
    }
    
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  
  decodeJwt(token: string): JwtPayload {
    if (token){
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    return this.jwtService.decode(token) as JwtPayload;
  }
  return;
  }
}