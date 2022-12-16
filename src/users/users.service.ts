import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users, UsersDocument } from "./users.schema";
import { CreateUsersDto } from "./dto/create-users.dto";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";

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

  async getUserByEmail(email:string): Promise<Users> {
    const user = await this.userModel.findOne({email, include: {all: true}})
    return user;
  }

  async createUser(userDto: CreateUsersDto) {
    const newUser = await new this.userModel(userDto)
    const role = await this.rolesService.getRoleByValue("INDIVIDUAL")
    await newUser.$set('roles', [role])
    return newUser.save()
  }

  async addRole(dto: AddRoleDto){
    const user = await this.userModel.findById(dto.userId);
    const role = await this.rolesService.getRoleByValue(dto.value);
    // @ts-ignore
    const isRole = await user.roles.find(el => el.value === role.value)

    if (role && user) {
      if (isRole){
        throw new HttpException('У пользователя уже имеется данная роль', HttpStatus.BAD_REQUEST)
      }
      const userRole = await user.roles
      await user.$set('roles', [...<any>userRole, role]);
      await user.save();
      return dto;
    }
    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
  }

  async addBan(dto: BanUserDto){
    const user = await this.userModel.findById(dto.userId);
    if (!user){
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }


}
