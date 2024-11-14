import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserIdReqDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '66b18d4ef740aaf686ed71d0',
    description: 'userId',
    required: false,
  })
  userId?: string;
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
