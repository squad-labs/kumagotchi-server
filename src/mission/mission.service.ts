import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMissionDto, MissionReqDto } from './dto/req.dto';
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

  async setMissionProgress(data: MissionReqDto) {
    const now = new Date();

    const missions = await this.missionModel.find({
      type: data.type,
      status: { $ne: 'ended' },
    });

    for (const mission of missions) {
      let newStatus = 'during';
      if (now < mission.startAt) {
        newStatus = 'upComing';
      } else if (now > mission.endAt) {
        newStatus = 'ended';
      }

      if (mission.status !== newStatus) {
        await this.missionModel.findByIdAndUpdate(mission._id, {
          status: newStatus,
        });
      }
    }

    const missionInfo = await this.missionModel.findOne({
      type: data.type,
      status: 'during',
    });

    if (!missionInfo) {
      throw new BadRequestException('Mission not found');
    }

    const userInfo = await this.usersModel.findById(data.userId);
    let mission = await this.missionModel.findByIdAndUpdate(
      missionInfo._id,
      {
        count: missionInfo.count + 1,
      },
      { new: true },
    );

    this.missionGateway.sendMissionProgress(userInfo.wallet, mission.count);

    if (mission.count >= mission.goal) {
      mission = await this.missionModel.findByIdAndUpdate(
        mission._id,
        {
          status: 'ended',
          result: true,
        },
        { new: true },
      );

      this.missionGateway.sendMissionComplete();
    }

    return mission;
  }

  async getMission(status?: string) {
    const query = status ? { status } : {};

    const missions = await this.missionModel.find(query);

    return missions;
  }
}
