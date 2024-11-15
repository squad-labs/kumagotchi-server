import { Body, Controller, Post } from '@nestjs/common';
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
}
