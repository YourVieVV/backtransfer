import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";

@Controller('/api')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post('/roles')
  create(@Body() dto:CreateRoleDto){
    return this.rolesService.createRole(dto)
  }

  @Get('/roles/:value')
  getByValue(@Param('value') value: string){
    return this.rolesService.getRoleByValue(value);
  }


}
