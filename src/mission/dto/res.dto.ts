import { PartialType } from '@nestjs/swagger';
import { CreateMissionDto } from './req.dto';

export class UpdateMissionDto extends PartialType(CreateMissionDto) {}
