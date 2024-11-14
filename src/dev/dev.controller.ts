import { Controller, Param, Delete } from '@nestjs/common';
import { DevService } from './dev.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommentIdReqDto, UserIdReqDto } from 'src/common/dto/req.dto';
import { TransactionService } from 'src/transaction/transaction.service';

@ApiTags('Dev')
@Controller('api/dev')
export class DevController {
  constructor(
    private readonly devService: DevService,
    private readonly transactionService: TransactionService,
  ) {}

  @ApiBearerAuth()
  @Delete('user/:userId')
  removeUser(@Param() { userId }: UserIdReqDto) {
    return this.devService.removeUser(userId);
  }

  @ApiBearerAuth()
  @Delete('comment/:commentId')
  removeComment(@Param() { commentId }: CommentIdReqDto) {
    return this.devService.removeComment(commentId);
  }
}
