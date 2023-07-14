import {Controller, Body, Post, HttpException, Get, HttpStatus, Patch, Param} from '@nestjs/common';
import {UserService} from './user.service'
import { SendgridService } from 'src/utils/sendgrid.service';
import { CreateUserDTO } from './dtos/create-user.dto';


@Controller('user')
export class UserController {
    constructor(
      private userService: UserService,
      private readonly sendGridService: SendgridService
      ) {}

    @Post('/find')
    async getProfile(@Body() { email }: { email: string }) {
      console.log("\ncontroller.getProfile")
      try {
        const response = await this.userService.getUserId(email);
        return response;

      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }

    @Patch(':id/reset-token')
    async updateUserResetPasswordToken(@Param('id')  id: string) {
        console.log("controller.updateUserResetPasswordToken")
        const user = await this.userService.updateUserResetToken(id);
        await this.sendGridService.sendPasswordReset(id);
        
        return { message: 'Reset token emailed successfully' };
    }
    
    @Get('resetpassword/:resetToken')
    async getResetPassword(@Param('resetToken')  resetToken: string) {
        console.log("controller.resetPassword")
        const user = await this.userService.findByResetToken(resetToken);
        if (!user){
          return false;
        }
        return true;
    }

    @Patch('resetpassword/:resetToken')
    async resetPassword(@Param('resetToken')  resetToken:string, @Body('password') password:string) {
        console.log("controller.resetPassword")
        const user = await this.userService.updateUserPassword(resetToken, password);
        return user;
    }

    
}
