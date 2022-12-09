import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {

  @ApiProperty({example:"myName", description:'Имя для авторизации пользователя'})
  @Prop({ required: true })
  login: string;

  @ApiProperty({example:"user@mail.com", description:'Электронный почтовый адрес'})
  @Prop({ required: true, unique:true })
  email: string;

  @ApiProperty({example:"passNot123", description:'Пароль'})
  @Prop({ required: true })
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);