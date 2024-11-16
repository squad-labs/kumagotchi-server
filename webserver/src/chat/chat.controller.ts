import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import { CreateMessageDto } from './dto/req.dto';
import { PageReqDto } from 'src/common/dto/req.dto';

@ApiTags('Chat')
@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Public()
  @Post('create')
  postChat(@Body() createMessageDto: CreateMessageDto) {
    return this.chatService.postChat(createMessageDto);
  }

  @Public()
  @Get('recent')
  getRecentMessages(
    // @Query() { page }: PageReqDto,
    // @Query() { pageSize }: PageReqDto,
  ) {
    return this.chatService.getRecentMessages();
  }
}
