import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CommentsDocument = Comments & mongoose.Document;

@Schema({ timestamps: true, versionKey: '_v' })
export class Comments {
  @Prop()
  contents: string;

  @Prop()
  topicId: string;

  @Prop()
  userWallet: string;

  @Prop()
  likes: string[];

  @Prop()
  createdAt: Date;

  @Prop({ default: null })
  parentId: string | null;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
