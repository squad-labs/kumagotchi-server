import { CharacterSchema } from './../common/schemas/character.schema';
import { Module } from '@nestjs/common';
import { MissionService } from './mission.service';
import { MissionController } from './mission.controller';
import { MissionSchema } from 'src/common/schemas/mission.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MissionGateway } from './mission.gateway';
import { UsersSchema } from 'src/common/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Mission', schema: MissionSchema },
      { name: 'Users', schema: UsersSchema },
      { name: 'Character', schema: CharacterSchema },
    ]),
  ],
  controllers: [MissionController],
  providers: [MissionService, MissionGateway],
})
export class MissionModule {}
