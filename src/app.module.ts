import { Controller, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [],
  providers: [],
  imports:[
    ConfigModule.forRoot({
    envFilePath: `.env.development`
    }),
    MongooseModule.forRoot('mongodb://root:example@localhost:27017/'),
    UsersModule,
    RolesModule,
    AuthModule,
  ]
  ,
})
export class AppModule {}