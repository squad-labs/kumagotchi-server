import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '66ee12c9aecfeb6f0e98cb6a',
    required: true,
  })
  topicId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:
      'His unapologetic stance on national security has kept America safe from threats',
    required: true,
  })
  contents: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '66ee2080aecfeb6f0e98ccb9',
    required: false,
  })
  parentId?: string;
}

export class SortReqDto {
  @ApiPropertyOptional({
    example: 'likes',
    required: true,
  })
  sort?: string;
}
