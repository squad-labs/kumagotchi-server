import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MissionService } from './mission.service';
import { CreateMissionDto } from './dto/req.dto';
import { ApiTags } from '@nestjs/swagger';
import { MissionIdReqDto } from 'src/common/dto/req.dto';
import { User, UserAfterAuth } from 'src/common/decorator/user.decorator';
import { Public } from 'src/common/decorator/public.decorator';

@ApiTags('Mission')
@Controller('api/mission')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Public()
  @Post('create')
  create(@Body() createMissionDto: CreateMissionDto) {
    return this.missionService.create(createMissionDto);
  }

  @Public()
  @Post('compliments')
  setCompliments(@User() user: UserAfterAuth) {
    return this.missionService.setCompliments(user.id);
  }

  @Public()
  @Post('feed')
  setFeed(@User() user: UserAfterAuth) {
    return this.missionService.setFeed(user.id);
  }

  @Public()
  @Post('party')
  setParty(@User() user: UserAfterAuth) {
    return this.missionService.setParty(user.id);
  }

  @Public()
  @Post('sleep')
  setSleep(@User() user: UserAfterAuth) {
    return this.missionService.setSleep(user.id);
  }

  @Public()
  @Get()
  findAll() {
    return this.missionService.findAll();
  }

  @Public()
  @Get(':missionId')
  findOne(@Param() { missionId }: MissionIdReqDto) {
    return this.missionService.findOne(missionId);
  }
}
