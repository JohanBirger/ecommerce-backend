import {Controller, Body, Post, HttpException, Get, HttpStatus, Patch, Param} from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('crypto')
export class CryptoController {
    constructor( private readonly cryptoService: CryptoService) {}

    @Get('/')
    async getToken() {
        return this.cryptoService.generateToken();
    }

    
}
