import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Roles, RolesSchema } from "./roles.schema";
import { Users, UsersSchema } from "../users/users.schema";

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [MongooseModule.forFeature([
    {
      name: Roles.name, schema: RolesSchema
    },
    {
      name: Users.name, schema: UsersSchema
    }
  ])],
  exports:[
    RolesService
  ]
})
export class RolesModule {}
