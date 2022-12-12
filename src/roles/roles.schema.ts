import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";
import { Users } from "../users/users.schema";

export type RolesDocument = HydratedDocument<Roles>;

@Schema()
export class Roles {

  @ApiProperty({example:"Legal organization", description:'Значение роли пользователя'})
  @Prop({ required: true })
  value: string;

  @ApiProperty({example:"Юридическая организация", description:'Описание роли'})
  @Prop({ required: false })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  users: Users;

}

export const RolesSchema = SchemaFactory.createForClass(Roles);