import { ApiProperty } from "@nestjs/swagger";

export class CreateUsersDto {
  @ApiProperty({example:"myName", description:'Имя для авторизации пользователя'})
  readonly login: string;

  @ApiProperty({example:"user@mail.com", description:'Электронный почтовый адрес'})
  readonly email: string;

  @ApiProperty({example:"passNot123", description:'Пароль'})
  readonly password: string;
}