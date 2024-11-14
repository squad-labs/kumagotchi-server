import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type MissionDocument = Mission & mongoose.Document;

@Schema({ timestamps: true, versionKey: '_v' })
export class Mission {
  @Prop()
  startAt: Date;

  @Prop()
  endAt: Date;

  @Prop()
  status: string;

  @Prop()
  type: string;

  @Prop()
  goal: number;

  @Prop()
  count: number;

  @Prop()
  result: boolean;

  @Prop()
  createdAt: Date;
}

export const MissionSchema = SchemaFactory.createForClass(Mission);
