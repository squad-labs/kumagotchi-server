import { PartialType } from '@nestjs/swagger';
import { CreateChatDto } from './req.dto';

export class UpdateChatDto extends PartialType(CreateChatDto) {}
