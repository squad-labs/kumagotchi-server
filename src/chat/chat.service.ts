// chat.service.ts
import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/req.dto';

@Injectable()
export class ChatService {
  private messages: any[] = [];

  async saveMessage(messageDto: CreateMessageDto) {
    const message = {
      id: Date.now(),
      ...messageDto,
      timestamp: new Date(),
    };
    this.messages.push(message);
    return message;
  }

  getRecentMessages() {
    return this.messages.slice(-50);
  }
}
