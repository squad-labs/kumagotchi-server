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
    example: '66ee12c9aecfeb6f0e98cb6a',
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
