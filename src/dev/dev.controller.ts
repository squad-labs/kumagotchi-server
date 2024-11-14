import { Controller, Param, Delete } from '@nestjs/common';
import { DevService } from './dev.service';
import { ApiTags } from '@nestjs/swagger';
import { ChatIdReqDto, UserIdReqDto } from 'src/common/dto/req.dto';
import { TransactionService } from 'src/transaction/transaction.service';
import { Public } from 'src/common/decorator/public.decorator';

@ApiTags('Dev')
@Controller('api/dev')
export class DevController {
  constructor(
    private readonly devService: DevService,
    private readonly transactionService: TransactionService,
  ) {}

  @Public()
  @Delete('user/:userId')
  removeUser(@Param() { userId }: UserIdReqDto) {
    return this.devService.removeUser(userId);
  }

  @Public()
  @Delete('chat/:chatId')
  removeComment(@Param() { chatId }: ChatIdReqDto) {
    return this.devService.removeComment(chatId);
  }
}
