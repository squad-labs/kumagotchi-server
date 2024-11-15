import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/mission', cors: { origin: '*' } })
export class MissionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    try {
      console.log('client has connected: mission', client.id);
    } catch (error) {
      console.error(`Connection error: ${error.message}`, error.stack);
      client.emit('error', 'Connection error');
    }
  }

  handleDisconnect(client: Socket) {
    console.log('client has disconnected: activity', client.id);
  }

  sendMissionProgress(wallet: string, count: number, goal: number) {
    this.server.emit('missionProgress', { wallet, count, goal });
  }

  sendMissionComplete() {
    this.server.emit('missionComplete', 'Mission complete');
  }
}
