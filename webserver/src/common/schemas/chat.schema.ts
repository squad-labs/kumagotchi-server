import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ChatDocument = Chat & mongoose.Document;

@Schema({ timestamps: true, versionKey: '_v' })
export class Chat {
  @Prop()
  message: string;

  @Prop()
  wallet: string;

  @Prop()
  ens: string;

  @Prop()
  profileImg: string;

  @Prop()
  handle: string;

  @Prop()
  createdAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
