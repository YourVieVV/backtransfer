import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users, UsersDocument } from "./users.schema";
import { CreateUsersDto } from "./dto/create-users.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private userModel: Model<UsersDocument>) {}

  async getAllUsers(): Promise<Users[]> {
    return await this.userModel.find().exec()
  }

  // async getById(): Promise<Users> {
  //   return this.userModel.findById(id)
  // }

  async createUser(userDto: CreateUsersDto): Promise<Users> {
    const newUser = await new this.userModel(userDto)
    return newUser.save()
  }


}
