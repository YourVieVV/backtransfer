import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateUsersDto } from "./dto/create-users.dto";
import { Users } from "./users.schema";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Пользователи')
@Controller('/api')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @ApiOperation({summary: 'Просмотр всех пользователей'})
  @ApiResponse({status: 200, type: [Users]})
  @Get('/users/showAll')
  getAll() {
    return this.usersService.getAllUsers()
  }

  @ApiOperation({summary: 'Просмотр пользователя по id'})
  @ApiResponse({status: 200, type: Users})
  @Get('/users/show')
  getById(@Param('id') id: string): string {
    return id
  }

  @ApiOperation({summary: 'Создание пользователя'})
  @ApiResponse({status: 200, type: Users})
  @Post('/users/create')
  create(@Body() CreateUsersDto: CreateUsersDto): Promise<Users>{
    return this.usersService.createUser(CreateUsersDto);
  }

}
