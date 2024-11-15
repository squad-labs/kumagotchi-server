import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCharacterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'KUMAGOTCHI',
    required: true,
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '0x00639eb72D1374110f509a157FFab47EFad29AB9',
    required: true,
  })
  address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:
      'https://dev-onikuma-s3.s3.ap-northeast-2.amazonaws.com/kumagotchi.png',
    required: true,
  })
  imageUrl: string;
}

export class NameReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'KUMAGOTCHI',
    required: true,
  })
  name: string;
}

export class ImageReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:
      'https://dev-onikuma-s3.s3.ap-northeast-2.amazonaws.com/kumagotchi.png',
    required: true,
  })
  imageUrl: string;
}

export class FileReqDto {
  @ApiProperty({
    description: 'file',
    type: 'string',
    format: 'binary',
    required: true,
  })
  file: any;
}
