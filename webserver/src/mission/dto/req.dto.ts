import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

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

export class MissionReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '6735e94269e4173579def4ae',
    description: 'userId',
    required: true,
  })
  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'compliments',
    description: 'compliments, feed, walk, sleep',
    required: true,
  })
  type: string;
}

export class StatusReqDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'ended',
    description: 'upComing, during, ended',
    required: false,
  })
  status?: string;
}

export class ResultReqDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: true,
    required: false,
  })
  result?: boolean;
}
