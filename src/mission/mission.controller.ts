import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MissionService } from './mission.service';
import { CreateMissionDto } from './dto/req.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MissionIdReqDto } from 'src/common/dto/req.dto';
import { User, UserAfterAuth } from 'src/common/decorator/user.decorator';

@ApiTags('Mission')
@Controller('api/mission')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @ApiBearerAuth()
  @Post('create')
  create(@Body() createMissionDto: CreateMissionDto) {
    return this.missionService.create(createMissionDto);
  }

  @ApiBearerAuth()
  @Post('compliments')
  setCompliments(@User() user: UserAfterAuth) {
    return this.missionService.setCompliments(user.id);
  }

  @ApiBearerAuth()
  @Post('feed')
  setFeed(@User() user: UserAfterAuth) {
    return this.missionService.setFeed(user.id);
  }

  @ApiBearerAuth()
  @Post('party')
  setParty(@User() user: UserAfterAuth) {
    return this.missionService.setParty(user.id);
  }

  @ApiBearerAuth()
  @Post('sleep')
  setSleep(@User() user: UserAfterAuth) {
    return this.missionService.setSleep(user.id);
  }

  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.missionService.findAll();
  }

  @ApiBearerAuth()
  @Get(':missionId')
  findOne(@Param() { missionId }: MissionIdReqDto) {
    return this.missionService.findOne(missionId);
  }
}
