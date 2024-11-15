import { PartialType } from '@nestjs/swagger';
import { CreateCharacterDto } from './req.dto';

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {}
