import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/common/schemas/users.schema';
import { Chat } from 'src/common/schemas/chat.schema';

@Injectable()
export class DevService {
  constructor(
    @InjectModel('Users')
    private usersModel: Model<Users>,
    @InjectModel('Chat')
    private chatModel: Model<Chat>,
  ) {}

  async removeUser(userId: string) {
    const deletedUser = await this.usersModel.findByIdAndDelete(userId);

    return deletedUser._id;
  }

  async removeComment(chatId: string) {
    const deletedChat = await this.chatModel.findByIdAndDelete(chatId);

    return deletedChat._id;
  }
}
