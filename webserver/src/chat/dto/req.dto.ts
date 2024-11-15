export class CreateChatDto {}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'KUMAGOTCHI hello',
    required: true,
  })
  message: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '0x00639eb72D1374110f509a157FFab47EFad29AB9',
    required: true,
  })
  wallet: string;
}
