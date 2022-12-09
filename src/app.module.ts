import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";


@Module({
  controllers: [],
  providers: [],
  imports:[
    ConfigModule.forRoot({
    envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
  ]
  ,
})
export class AppModule {}