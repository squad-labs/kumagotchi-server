import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/req.dto';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User, UserAfterAuth } from 'src/common/decorator/user.decorator';
import {
  ApiGetItemsResponse,
  ApiPostResponse,
} from 'src/common/decorator/swagger.decorator';
import {
  CreateCommentResDto,
  FindAllResDto,
  LikeOneResDto,
} from './dto/res.dto';
import { PageReqDto } from 'src/common/dto/req.dto';

@ApiTags('Comments')
@ApiExtraModels(CreateCommentResDto, FindAllResDto, LikeOneResDto)
@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth()
  @Post()
  @ApiPostResponse(CreateCommentResDto)
  @ApiOperation({
    summary: 'post comment',
  })
  create(@Body() data: CreateCommentDto, @User() user: UserAfterAuth) {
    return this.commentsService.create(data, user.id);
  }

  @ApiBearerAuth()
  @Get('all/:topicId')
  @ApiGetItemsResponse(FindAllResDto)
  @ApiOperation({
    summary: 'comment 조회: pagination',
  })
  findAll(@Query() { page }: PageReqDto, @Query() { pageSize }: PageReqDto) {
    return this.commentsService.findAll(page, pageSize);
  }
}
