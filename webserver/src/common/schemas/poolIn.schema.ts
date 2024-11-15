import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type PoolInDocument = PoolIn & mongoose.Document;

@Schema({ timestamps: true, versionKey: '_v' })
export class PoolIn {
  @Prop()
  wallet: string;

  @Prop()
  chain: string;

  @Prop()
  poolIn: number;

  @Prop()
  createdAt: Date;
}

export const PoolInSchema = SchemaFactory.createForClass(PoolIn);
