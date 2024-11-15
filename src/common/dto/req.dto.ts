import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UserIdReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '6735e94269e4173579def4ae',
    description: 'userId',
    required: true,
  })
  userId: string;
}

export class WalletReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '0x00639eb72D1374110f509a157FFab47EFad29AB9',
    description: 'wallet',
    required: true,
  })
  wallet: string;
}

export class ChatIdReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '66bb101601e784817a6183e8',
    description: 'chatId',
    required: true,
  })
  chatId: string;
}

export class PageReqDto {
  @ApiPropertyOptional({
    example: 1,
  })
  @Transform((Param) => Number(Param.value))
  @IsInt()
  page?: number = 1;

  @ApiPropertyOptional({
    example: 10,
  })
  @Transform((Param) => Number(Param.value))
  @IsInt()
  pageSize?: number = 10;
}

export class MissionIdReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '66bb101601e784817a6183e8',
    description: 'missionId',
    required: true,
  })
  missionId: string;
}
