import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PoolInReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '0x00639eb72D1374110f509a157FFab47EFad29AB9',
    required: true,
  })
  wallet: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    required: true,
  })
  tokenAmount: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:
      '0x1b9e79c41aa64d759c2f7fba58fde5f50d1fec8fec13df990d9582d2a2f60398',
    required: true,
  })
  txHash: string;
}
