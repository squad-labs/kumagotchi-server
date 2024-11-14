import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMissionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '2024-11-17T00:00:00+00:00',
    required: true,
  })
  startAt: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '2024-11-18T00:00:00+00:00',
    required: true,
  })
  endAt: Date;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 100,
    required: true,
  })
  goal: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'compliments',
    description: 'compliments, feed, party, sleep',
    required: true,
  })
  type: string;
}
