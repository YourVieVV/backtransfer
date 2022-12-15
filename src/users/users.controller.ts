import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CreateUsersDto } from "./dto/create-users.dto";
import { Users } from "./users.schema";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags('Пользователи')
@Controller(`/api/users`)
export class UsersController {

  constructor(private usersService: UsersService) {}

  @ApiOperation({summary: 'Просмотр всех пользователей'})
  @ApiResponse({status: 200, type: [Users]})
  @UseGuards(JwtAuthGuard)
  @Get('/showAll')
  getAll() {
    return this.usersService.getAllUsers()
  }

  @ApiOperation({summary: 'Просмотр пользователя по id'})
  @ApiResponse({status: 200, type: Users})
  @Get('/show')
  getById(@Param('id') id: string): string {
    return id
  }

  @ApiOperation({summary: 'Создание пользователя'})
  @ApiResponse({status: 200, type: Users})
  @Post('/create')
  create(@Body() CreateUsersDto: CreateUsersDto): Promise<Users>{
    return this.usersService.createUser(CreateUsersDto);
  }

}
