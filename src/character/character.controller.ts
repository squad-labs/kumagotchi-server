import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto, FileReqDto, NameReqDto } from './dto/req.dto';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

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
  findOne(@Query() { name }: NameReqDto) {
    return this.characterService.findOne(name);
  }

  @Public()
  @Post('change-image')
  @ApiOperation({
    summary: 'Change character image',
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  changeImage(
    @UploadedFile() file: any,
    @Query() { name }: NameReqDto,
    @Body() data: FileReqDto,
  ) {
    return this.characterService.changeImage(file, name);
  }
}
