import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto } from './dto/req.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comments } from 'src/common/schemas/comments.schema';
import { Users } from 'src/common/schemas/users.schema';
import { CommentsGateway } from './comments.gateway';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('Users')
    private usersModel: Model<Users>,
    @InjectModel('Comments')
    private commentsModel: Model<Comments>,
    private commentsGateway: CommentsGateway,
  ) {}

  async create(data: CreateCommentDto, userId: string) {
    const userInfo = await this.usersModel.findById(userId);
    if (!userInfo) {
      throw new UnauthorizedException('User not found');
    }

    const newComment = {
      contents: data.contents,
      topicId: data.topicId,
      userWallet: userInfo.wallet,
      likes: [],
    };

    const createdComment = await this.commentsModel.create(newComment);

    const broadcastComment = {
      commentId: createdComment._id,
      userWallet: createdComment.userWallet,
      contents: createdComment.contents,
      createdAt: createdComment.createdAt,
    };
    this.commentsGateway.broadcastComments(broadcastComment);

    return broadcastComment;
  }

  async findAll(page: number, pageSize: number) {
    let comments = [];
    comments = await this.commentsModel.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * pageSize },
      { $limit: pageSize },
    ]);

    return comments;
  }
}
