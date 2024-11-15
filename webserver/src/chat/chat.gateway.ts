// chat.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from './dto/req.dto';

@WebSocketGateway({ namespace: '/chat', cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedClients: Set<string> = new Set();

  handleConnection(client: Socket) {
    try {
      this.connectedClients.add(client.id);
      console.log('client has connected: chat', client.id);

      this.broadcastUserCount();
    } catch (error) {
      console.error(`Connection error: ${error.message}`);
    }
  }

  handleDisconnect(client: Socket) {
    try {
      this.connectedClients.delete(client.id);
      console.log('client has disconnected: chat', client.id);

      this.broadcastUserCount();
    } catch (error) {
      console.error(`Disconnect error: ${error.message}`);
    }
  }

  sendNewMessage(wallet: string, message: CreateMessageDto) {
    this.server.emit('newMessage', { wallet, message });
  }

  private broadcastUserCount() {
    if (this.server) {
      const userCount = this.connectedClients.size;
      this.server.emit('userCount', userCount);
    }
  }
}
