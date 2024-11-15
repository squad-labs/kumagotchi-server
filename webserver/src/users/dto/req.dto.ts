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

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'x handle',
    example: 'watcherkuma',
  })
  handle?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'ens',
    example: 'tokenburner.eth',
  })
  ens?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    example:
      'https://i.seadn.io/gae/vzj-_EN2uwXCv7-g01_vK1-Sqp8MtpQQSed8-YmqI8N_V9mHv1mW1HYJbqaFxsASxYUrRIs9ihhUSmPRfwL5UwJSIBc57haYFosWWQ?auto=format&dpr=1&w=1000',
  })
  profileImg?: string;
}
