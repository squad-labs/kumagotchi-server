import { UserIdReqDto } from './../common/dto/req.dto';
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
  setCompliments(@Body() { userId }: UserIdReqDto) {
    return this.missionService.setCompliments(userId);
  }

  @Public()
  @Post('feed')
  setFeed(@Body() { userId }: UserIdReqDto) {
    return this.missionService.setFeed(userId);
  }

  @Public()
  @Post('party')
  setParty(@Body() { userId }: UserIdReqDto) {
    return this.missionService.setParty(userId);
  }

  @Public()
  @Post('sleep')
  setSleep(@Body() { userId }: UserIdReqDto) {
    return this.missionService.setSleep(userId);
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
