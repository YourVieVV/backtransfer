import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUsersDto {
  @ApiProperty({example:"myName", description:'Имя для авторизации пользователя'})
  @IsString({message: 'Должно быть строкой'})
  readonly login: string;

  @ApiProperty({example:"user@mail.com", description:'Электронный почтовый адрес'})
  @IsString({message: 'Должно быть строкой'})
  @IsEmail({}, {message: 'Должно быть email'})
  readonly email: string;

  @ApiProperty({example:"passNot123", description:'Пароль'})
  @IsString({message: 'Должно быть строкой'})
  @Length(4, 12, {message:'Пароль должен имень не меньше 4 символов и не больше 12'})
  readonly password: string;
}