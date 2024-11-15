import { UserIdReqDto } from 'src/common/dto/req.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { PoolInReqDto } from './dto/req.dto';
import { Public } from 'src/common/decorator/public.decorator';

@ApiTags('Transactions')
@Controller('api/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Public()
  @Post('pool-in')
  poolIn(@Body() poolInReqDto: PoolInReqDto) {
    return this.transactionService.poolIn(poolInReqDto);
  }

  @Public()
  @Get('pool-address')
  getPoolAddress() {
    return this.transactionService.getPoolAddress();
  }

  @Public()
  @Post('pool-amount')
  getPoolAmount(@Body() { userId }: UserIdReqDto) {
    return this.transactionService.getPoolAmount(userId);
  }
}
