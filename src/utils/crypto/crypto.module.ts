import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import {CryptoController} from './crypto.controller';

@Module({
  imports: [],
  providers: [CryptoService],
  exports: [CryptoService],
  controllers: [CryptoController]
})
export class CryptoModule {}