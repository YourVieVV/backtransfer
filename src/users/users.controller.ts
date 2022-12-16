import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CreateUsersDto } from "./dto/create-users.dto";
import { Users } from "./users.schema";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles-guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";

@ApiTags('Пользователи')
@Controller(`/api/users`)
export class UsersController {

  constructor(private usersService: UsersService) {}

  @ApiOperation({summary: 'Просмотр всех пользователей'})
  @ApiResponse({status: 200, type: [Users]})
  @Roles('INDIVIDUAL')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/showAll')
  getAll() {
    return this.usersService.getAllUsers()
  }

  @ApiOperation({summary: 'Просмотр пользователя по id'})
  @ApiResponse({status: 200, type: Users})
  @Get('/show/:id')
  getById(@Param('id') id: string): string {
    return id
  }

  @ApiOperation({summary: 'Выдать роль'})
  @ApiResponse({status: 200})
  @Roles('MODERATOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/addRole')
  addRole(@Body() dto:AddRoleDto) {
    return this.usersService.addRole(dto)
  }

  @ApiOperation({summary: 'Забанить пользователя'})
  @ApiResponse({status: 200})
  @Roles('MODERATOR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/addBan')
  addBan(@Body() dto:BanUserDto) {
    return this.usersService.addBan(dto)
  }

  // Используется в авторизации
  // @ApiOperation({summary: 'Создание пользователя'})
  // @ApiResponse({status: 200, type: Users})
  // @Post('/create')
  // create(@Body() CreateUsersDto: CreateUsersDto): Promise<Users>{
  //   return this.usersService.createUser(CreateUsersDto);
  // }

}
