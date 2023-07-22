import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as SendGrid from '@sendgrid/mail';
import {UserService}  from "../user/user.service";
import { CheckOutProps } from "src/checkout/schema/checkout.interface";

@Injectable()
export class SendgridService {
    constructor(
      private readonly configService: ConfigService,
      private readonly userService: UserService
      ) {
        SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
    }

    async sendPasswordReset(userId: string) {
        console.log("service.sendPasswordReset")
        const user = await this.userService.getUserById(userId);
        const email = await user.email;
        const token = await user.resetToken;
        const baseUrl = this.configService.get<string>('FRONTEND_URL');
        const extentionUrl= '/resetpassword/'
        const urlprepared = `${baseUrl+extentionUrl+token}`
   
        const mail = {
          to: email,
          subject: 'Reset Password',
          from: 'johankoddar@gmail.com',
          templateId:'d-4d53bb486e054ecaa5f2ed3aeed58fa6',
          dynamicTemplateData: {
            resetToken: urlprepared,
          },
      };
        const transport = await SendGrid.send(mail);

        console.log(`Email successfully dispatched to ${mail.to}`)
        return transport;
    }


    async sendOrder(userId: string, order:CheckOutProps) {
      console.log("service.sendOrder")
      const user = await this.userService.getUserById(userId);
      const email = await user.email;
      const token = await user.resetToken;
      const baseUrl = this.configService.get<string>('FRONTEND_URL');
      const extentionUrl= '/resetpassword/'
      const urlprepared = `${baseUrl+extentionUrl+token}`
 
      const mail = {
        to: email,
        subject: 'Your Order has arrived!',
        from: 'johankoddar@gmail.com',
        templateId:'',
        dynamicTemplateData: {
          ///

        },
    };
      const transport = await SendGrid.send(mail);

      console.log(`Email successfully dispatched to ${mail.to}`)
      return transport;
  }
}
