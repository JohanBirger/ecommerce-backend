import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://johbirger:${process.env.MONGOKEY}@cluster0.ddwvlsd.mongodb.net/`),
  ],
})
export class DatabaseModule {}