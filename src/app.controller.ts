import { Controller, Get, Post, Request, Response } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('test')
  getHello(@Request() req, @Response() res) {
    console.log('Cookie: ', req.cookies.myCookie);
    res.send('Cookie received');
  }

  
}
