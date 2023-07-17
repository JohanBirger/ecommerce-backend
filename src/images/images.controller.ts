// images.controller.ts
import { Controller, Get, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  getImages() {
    return this.imagesService.getImages();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFile() file) {
    return {
      url: file.location, // This is the URL of the uploaded image in S3
      name: file.originalname,
    };
  }
}