import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginResDto {
  @ApiProperty({ required: true, example: '66b18d4ef740aaf686ed71d0' })
  userId: string;

  @ApiProperty({
    required: true,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmIxOGQ0ZWY3NDBhYWY2ODZlZDcxZDAiLCJ0b2tlblR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3MjI5MjAyODMsImV4cCI6MTcyNTUxMjI4M30.sdsioOpOm_qZi8LXt8j1V3N5Uv-U24EEPuIkMh6ufmM',
  })
  accessToken: string;

  @ApiProperty({ required: true, example: '2024-08-06T02:41:18.441Z' })
  createdAt: Date;
}

export class UserResDto {
  @ApiProperty({ required: true, example: '66b18d4ef740aaf686ed71d0' })
  userId: string;

  @ApiProperty({ required: true, example: '0x123456' })
  wallet: string;

  @ApiPropertyOptional({ example: 'Asia/Seoul' })
  timezone?: string;

  @ApiPropertyOptional({ example: 'tokenburner.eth' })
  ens?: string;

  @ApiPropertyOptional({
    example:
      'https://i.seadn.io/gae/vzj-_EN2uwXCv7-g01_vK1-Sqp8MtpQQSed8-YmqI8N_V9mHv1mW1HYJbqaFxsASxYUrRIs9ihhUSmPRfwL5UwJSIBc57haYFosWWQ?auto=format&dpr=1&w=1000',
  })
  profileImg?: string;

  @ApiProperty({
    required: true,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmIxOGQ0ZWY3NDBhYWY2ODZlZDcxZDAiLCJ0b2tlblR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3MjI5MjA0MzcsImV4cCI6MTcyNTUxMjQzN30.TSD9-0xGesqNaDJRi9dcr-AQsuH8tPblQBBgA3mORI4',
  })
  accessToken: string;

  @ApiProperty({
    required: true,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmIxOGQ0ZWY3NDBhYWY2ODZlZDcxZDAiLCJ0b2tlblR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzIyOTIwNDM3LCJleHAiOjE3MjU1MTI0Mzd9.qf_9jZnAl_CyOsQwGFVNE5hySErQGaKwOpQbtCWEpR8',
  })
  refreshToken: string;

  @ApiProperty({ required: true, example: '2024-08-06T02:41:18.441Z' })
  createdAt: Date;
}
