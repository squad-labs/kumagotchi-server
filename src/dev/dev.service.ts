import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/common/schemas/users.schema';
import { Comments } from 'src/common/schemas/comments.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DevService {
  constructor(
    @InjectModel('Users')
    private usersModel: Model<Users>,
    @InjectModel('Comments')
    private commentsModel: Model<Comments>,
    private configService: ConfigService,
  ) {}

  async removeUser(userId: string) {
    const deletedUser = await this.usersModel.findByIdAndDelete(userId);

    return deletedUser._id;
  }

  async removeComment(commentId: string) {
    const deletedComment =
      await this.commentsModel.findByIdAndDelete(commentId);

    return deletedComment._id;
  }
}
