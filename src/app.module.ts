import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkModule } from './link/link.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LinkModule,
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_INITDB_USERNAME}:${process.env.MONGO_INITDB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGO_INITDB_DATABASE}`,
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
