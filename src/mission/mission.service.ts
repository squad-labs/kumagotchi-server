import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMissionDto } from './dto/req.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mission } from 'src/common/schemas/mission.schema';
import { MissionGateway } from './mission.gateway';
import { Users } from 'src/common/schemas/users.schema';

@Injectable()
export class MissionService {
  constructor(
    @InjectModel('Mission')
    private missionModel: Model<Mission>,
    @InjectModel('Users')
    private usersModel: Model<Users>,
    private missionGateway: MissionGateway,
  ) {}

  async create(data: CreateMissionDto) {
    try {
      const newMission = await this.missionModel.create({
        ...data,
        status: 'during',
        count: 0,
        result: false,
      });

      return newMission;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    const missions = await this.missionModel.find();

    return missions;
  }

  async findOne(missionId: string) {
    const mission = await this.missionModel.findById(missionId);

    if (!mission) {
      throw new BadRequestException('Mission not found');
    }

    return mission;
  }

  async setCompliments(userId: string) {
    const userInfo = await this.usersModel.findById(userId);
    const missionInfo = await this.missionModel.findOne({
      type: 'compliments',
      status: 'during',
    });

    if (!missionInfo) {
      return 'Mission not found';
    }

    const mission = await this.missionModel.findByIdAndUpdate(missionInfo._id, {
      count: missionInfo.count + 1,
    });

    this.missionGateway.sendMissionProgress(userInfo.wallet, mission.count);

    if (mission.count === mission.goal) {
      await this.missionModel.findByIdAndUpdate(mission._id, {
        status: 'ended',
        result: true,
      });

      this.missionGateway.sendMissionComplete();
    }

    return mission;
  }

  async setFeed(userId: string) {
    const userInfo = await this.usersModel.findById(userId);
    const missionInfo = await this.missionModel.findOne({
      type: 'feed',
      status: 'during',
    });

    if (!missionInfo) {
      return 'Mission not found';
    }

    const mission = await this.missionModel.findByIdAndUpdate(missionInfo._id, {
      count: missionInfo.count + 1,
    });

    this.missionGateway.sendMissionProgress(userInfo.wallet, mission.count);

    if (mission.count === mission.goal) {
      await this.missionModel.findByIdAndUpdate(mission._id, {
        status: 'ended',
        result: true,
      });

      this.missionGateway.sendMissionComplete();
    }

    return mission;
  }

  async setParty(userId: string) {
    const userInfo = await this.usersModel.findById(userId);
    const missionInfo = await this.missionModel.findOne({
      type: 'party',
      status: 'during',
    });

    if (!missionInfo) {
      return 'Mission not found';
    }

    const mission = await this.missionModel.findByIdAndUpdate(missionInfo._id, {
      count: missionInfo.count + 1,
    });

    this.missionGateway.sendMissionProgress(userInfo.wallet, mission.count);

    if (mission.count === mission.goal) {
      await this.missionModel.findByIdAndUpdate(mission._id, {
        status: 'ended',
        result: true,
      });

      this.missionGateway.sendMissionComplete();
    }

    return mission;
  }

  async setSleep(userId: string) {
    const userInfo = await this.usersModel.findById(userId);
    const missionInfo = await this.missionModel.findOne({
      type: 'sleep',
      status: 'during',
    });

    if (!missionInfo) {
      return 'Mission not found';
    }

    const mission = await this.missionModel.findByIdAndUpdate(missionInfo._id, {
      count: missionInfo.count + 1,
    });

    this.missionGateway.sendMissionProgress(userInfo.wallet, mission.count);

    if (mission.count === mission.goal) {
      await this.missionModel.findByIdAndUpdate(mission._id, {
        status: 'ended',
        result: true,
      });

      this.missionGateway.sendMissionComplete();
    }

    return mission;
  }
}
