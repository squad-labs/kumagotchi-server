import { Controller, Get, Post, Body } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/req.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';

@ApiTags('Character')
@Controller('api/character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Public()
  @Post('create')
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @Public()
  @Get('find')
  findOne() {
    return this.characterService.findOne();
  }
}
