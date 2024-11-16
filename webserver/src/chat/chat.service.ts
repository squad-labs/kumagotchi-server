// chat.service.ts
import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/req.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from 'src/common/schemas/chat.schema';
import { Model } from 'mongoose';
import { ChatGateway } from './chat.gateway';
import { Users } from 'src/common/schemas/users.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel('Chat')
    private chatModel: Model<Chat>,
    @InjectModel('Users')
    private usersModel: Model<Users>,

    private chatGateway: ChatGateway,
  ) {}

  async postChat(data: CreateMessageDto) {
    const userInfo = await this.usersModel.findOne({ wallet: data.wallet });

    if (!userInfo) {
      throw new Error('User not found');
    }

    const newMessage = await this.chatModel.create({
      ...data,
      ens: userInfo.ens,
      profileImg: userInfo.profileImg,
      handle: userInfo.handle,
    });

    this.chatGateway.server.emit('newMessage', newMessage);

    return newMessage;
  }

  async getRecentMessages() {
    const messages = await this.chatModel
      .find()
      .sort({ createdAt: -1 })
      // .skip((page - 1) * pageSize)
      // .limit(pageSize);

    return messages;
  }
}
