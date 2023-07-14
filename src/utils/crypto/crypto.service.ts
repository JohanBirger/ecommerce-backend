import { Injectable } from "@nestjs/common";
import {randomBytes} from 'crypto';

@Injectable()
export class CryptoService {

async generateToken(): Promise<string> {
    console.log("service.generateToken")
    const token = randomBytes(20);
    return token.toString('hex');
  }

}