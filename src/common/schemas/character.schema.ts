import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CharacterDocument = Character & mongoose.Document;

@Schema({ timestamps: true, versionKey: '_v' })
export class Character {
  @Prop()
  name: string;

  @Prop()
  poolIn: number;

  @Prop()
  address: string;

  @Prop()
  imageUrl: string;

  @Prop()
  level: string;

  @Prop()
  compliments: number;

  @Prop()
  feed: number;

  @Prop()
  party: number;

  @Prop()
  sleep: number;

  @Prop()
  createdAt: Date;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
