import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'wallet address',
    example: '0x00639eb72D1374110f509a157FFab47EFad29AB9',
    required: true,
  })
  wallet: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'timezone',
    example: 'Asia/Seoul',
  })
  timezone?: string;
}
