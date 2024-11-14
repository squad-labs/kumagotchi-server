import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/comment', cors: { origin: '*' } })
export class CommentsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    try {
      console.log('client has connected: comment', client.id);

      // 연결 오류 이벤트 리스너 추가
      client.conn.on('connection_error', (err) => {
        console.log(err.req); // the request object
        console.log(err.code); // the error code, for example 1
        console.log(err.message); // the error message, for example "Session ID unknown"
        console.log(err.context); // some additional error context
      });
    } catch (error) {
      console.error(`Connection error: ${error.message}`, error.stack);
      client.emit('error', 'Connection error');
    }
  }

  handleDisconnect(client: Socket) {
    console.log('client has disconnected: comment', client.id);
  }

  broadcastComments(comments: any) {
    this.server.emit('comment', comments);
  }

  broadcastLikes(likes: any) {
    this.server.emit('like', likes);
  }

  @SubscribeMessage('typing')
  handleTyping(
    client: Socket,
    payload: { isTyping: boolean; userWallet: string },
  ) {
    client.broadcast.emit('typing', {
      userWallet: payload.userWallet,
      isTyping: payload.isTyping,
    });
  }
}
