import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PoolInReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'sepolia',
    required: true,
  })
  chain: string;

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
}
