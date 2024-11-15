import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { MissionService } from './mission.service';
import {
  CreateMissionDto,
  MissionReqDto,
  ResultReqDto,
  StatusReqDto,
} from './dto/req.dto';
import { ApiTags } from '@nestjs/swagger';
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
  @Post('in-progress')
  setMissionProgress(@Body() mission: MissionReqDto) {
    return this.missionService.setMissionProgress(mission);
  }

  @Public()
  @Get('find')
  getMission(
    @Query() { status }: StatusReqDto,
    @Query() { result }: ResultReqDto,
  ) {
    return this.missionService.getMission(status, result);
  }
}
