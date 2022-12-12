import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";
import { Roles } from "../roles/roles.schema";

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

  @Prop({ type: mongoose.Schema.Types.Array, ref: 'Roles' })
  roles: Roles;
}

export const UsersSchema = SchemaFactory.createForClass(Users);