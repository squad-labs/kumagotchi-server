import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UsersDocument = Users & mongoose.Document;

@Schema({ timestamps: true, versionKey: '_v' })
export class Users {
  @Prop()
  wallet: string;

  @Prop()
  poolIn: number;

  @Prop()
  timezone: string;

  @Prop()
  handle: string;

  @Prop()
  ens: string;

  @Prop()
  profileImg: string;

  @Prop()
  refreshToken: string;

  @Prop()
  createdAt: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
