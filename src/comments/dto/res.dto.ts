import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentResDto {
  @ApiProperty({ required: true, example: '66bb101601e784817a6183e8' })
  commentId: string;

  @ApiProperty({
    required: true,
    example:
      'His unapologetic stance on national security has kept America safe from threats',
  })
  contents: string;

  @ApiProperty({ required: true, example: '66bb07efff419cee8c3888e1' })
  topicId: string;

  @ApiProperty({ required: true, example: '0x123456' })
  userWallet: string;

  @ApiProperty({ required: true, example: '0' })
  likes: number;

  @ApiProperty({ required: true, example: '2024-08-07T01:48:05.342Z' })
  createdAt: Date;
}

export class FindAllResDto {
  @ApiProperty({ required: true, example: '66bb101601e784817a6183e8' })
  commentId: string;

  @ApiProperty({
    required: true,
    example:
      'His unapologetic stance on national security has kept America safe from threats',
  })
  contents: string;

  @ApiProperty({ required: true, example: '0x123456' })
  userWallet: string;

  @ApiProperty({ required: true, example: '0' })
  likes: number;

  @ApiProperty({ required: true, example: false })
  isLike: boolean;

  @ApiProperty({ required: true, example: '2024-08-07T01:48:05.342Z' })
  createdAt: Date;

  @ApiProperty({
    required: true,
    example: [
      {
        commentId: '66fa31f8b2267e07b41ce0fa',
        userWallet: '0x00639eb72D1374110f509a157FFab47EFad29AB9',
        contents:
          'His unapologetic stance on national security has kept America safe from threats',
        likes: 1,
        isLiked: true,
        createdAt: '2024-09-30T05:07:04.535Z',
        replies: [],
      },
    ],
  })
  replies: FindAllResDto[];
}

export class LikeOneResDto {
  @ApiProperty({ required: true, example: '66bb101601e784817a6183e8' })
  commentId: string;

  @ApiProperty({ required: true, example: '0' })
  likes: number;

  @ApiProperty({ required: true, example: false })
  isLiked: boolean;
}
