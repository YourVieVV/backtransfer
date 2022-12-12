import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Users, UsersSchema } from "./users.schema";
import { Roles, RolesSchema } from "../roles/roles.schema";
import { RolesModule } from "../roles/roles.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [MongooseModule.forFeature([
    {
      name: Users.name, schema: UsersSchema
    },
    {
      name: Roles.name, schema: RolesSchema
    }
  ]),
  RolesModule
  ]
})
export class UsersModule {}
