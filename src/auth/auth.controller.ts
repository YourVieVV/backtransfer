import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUsersDto } from "../users/dto/create-users.dto";
import { AuthService } from "./auth.service";

@ApiTags('Авторизация')
@Controller(`/api/auth`)
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post('/login')
  login(@Body() userDto: CreateUsersDto){
    return this.authService.login(userDto)
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUsersDto){
    return this.authService.registration(userDto)
  }

}
