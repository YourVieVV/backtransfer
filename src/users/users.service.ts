import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users, UsersDocument } from "./users.schema";
import { CreateUsersDto } from "./dto/create-users.dto";
import { RolesService } from "../roles/roles.service";

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private userModel: Model<UsersDocument>,
              private rolesService: RolesService) {}

  async getAllUsers(): Promise<Users[]> {
    const users = await this.userModel.find({include:{all:true}}).exec()
    return users;
  }

  // async getById(): Promise<Users> {
  //   return this.userModel.findById(id)
  // }

  async createUser(userDto: CreateUsersDto) {
    const newUser = await new this.userModel(userDto)
    const role = await this.rolesService.getRoleByValue("INDIVIDUAL")
    await newUser.$set('roles', [role])
    return newUser.save()
  }


}
