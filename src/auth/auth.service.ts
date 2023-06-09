import { Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException } from "@nestjs/common";
import { CreateUsersDto } from "../users/dto/create-users.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { Users } from "../users/users.schema";
import { LoginUsersDto } from "../users/dto/login-user.dto";

@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              private jwtService: JwtService) {}

  async login(userDto: LoginUsersDto){
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }


  async registration(userDto: CreateUsersDto){
    const candidate = await this.userService.getUserByLogin(userDto.login);
    if (candidate){
      throw new HttpException('Пользователь с таким login существует', HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(userDto.password, 7);
    const user = await this.userService.createUser(({...userDto, password: hashPassword}))
    return this.generateToken(user)
  }

  private async generateToken(user: Users){
    const payload = {login: user.login, email: user.email,  roles: user.roles}
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDto: LoginUsersDto) {
    const user = await this.userService.getUserByLogin(userDto.login);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals){
      return user;
    }
    throw new UnauthorizedException({message: 'Некорректный email или пароль'})
  }

}
