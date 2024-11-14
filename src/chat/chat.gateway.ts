// chat.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/req.dto';

@WebSocketGateway({ namespace: '/chat', cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedClients: Set<string> = new Set();

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    try {
      this.connectedClients.add(client.id);
      console.log('Client connected to chat:', client.id);

      // 안전하게 사용자 수 브로드캐스트
      this.broadcastUserCount();
    } catch (error) {
      console.error(`Connection error: ${error.message}`);
    }
  }

  handleDisconnect(client: Socket) {
    try {
      this.connectedClients.delete(client.id);
      console.log('Client disconnected from chat:', client.id);

      this.broadcastUserCount();
    } catch (error) {
      console.error(`Disconnect error: ${error.message}`);
    }
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: CreateMessageDto) {
    try {
      const message = await this.chatService.saveMessage(payload);
      this.server.emit('message', message);
    } catch (error) {
      client.emit('error', 'Message sending failed');
    }
  }

  @SubscribeMessage('typing')
  handleTyping(client: Socket, username: string) {
    client.broadcast.emit('typing', username);
  }

  private broadcastUserCount() {
    if (this.server) {
      const userCount = this.connectedClients.size;
      this.server.emit('userCount', userCount);
    }
  }
}
