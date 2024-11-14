import { Controller, Get, Post, Body, Headers, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginReqDto } from './dto/req.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User, UserAfterAuth } from 'src/common/decorator/user.decorator';
import { Public } from 'src/common/decorator/public.decorator';
import {
  ApiGetResponse,
  ApiPostResponse,
} from 'src/common/decorator/swagger.decorator';
import { LoginResDto, UserResDto } from './dto/res.dto';
import { UserIdReqDto } from 'src/common/dto/req.dto';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'wallet user create' })
  create(@Body() data: LoginReqDto) {
    return this.usersService.create(data);
  }

  @Public()
  @Post('refresh')
  @ApiOperation({ summary: 'refresh token 요청' })
  async refresh(
    @Headers('authorization') authorization,
    @User() user: UserAfterAuth,
  ) {
    const token = /Bearer\s(.+)/.exec(authorization)[1];
    const { accessToken, refreshToken } = await this.usersService.refresh(
      token,
      user.id,
    );
    return { accessToken, refreshToken };
  }

  @Public()
  @Get('detail/:userId')
  @ApiOperation({ summary: 'login user 정보' })
  findOne(@Param() { userId }: UserIdReqDto) {
    return this.usersService.findOne(userId);
  }
}
