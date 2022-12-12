import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Roles, RolesDocument } from "./roles.schema";
import { CreateRoleDto } from "./dto/create-role.dto";

@Injectable()
export class RolesService {


  constructor(@InjectModel(Roles.name) private rolesModel: Model<RolesDocument>) {}

  async createRole(dto:CreateRoleDto){
    const role = await this.rolesModel.create(dto);
    return role;
  }

  async getRoleByValue(value: string){
    const role = await this.rolesModel.findOne({where: {value}});
    return role;
  }

}
