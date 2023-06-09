import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class LoginUsersDto {
  @ApiProperty({example:"myName", description:'Имя для авторизации пользователя'})
  @IsString({message: 'Должно быть строкой'})
  readonly login: string;

  @ApiProperty({example:"passNot123", description:'Пароль'})
  @IsString({message: 'Должно быть строкой'})
  @Length(4, 12, {message:'Пароль должен имень не меньше 4 символов и не больше 12'})
  readonly password: string;
}