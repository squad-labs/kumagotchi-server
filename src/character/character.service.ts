import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/req.dto';
import { UpdateCharacterDto } from './dto/res.dto';
import { Character } from 'src/common/schemas/character.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel('Character')
    private characterModel: Model<Character>,
  ) {}

  async create(data: CreateCharacterDto) {
    const newCharacterData = {
      ...data,
      poolIn: 0,
      level: 0,
      compliments: 0,
      feed: 0,
      party: 0,
      sleep: 0,
    };
    const newCharacter = await this.characterModel.create(newCharacterData);

    return newCharacter;
  }

  findOne() {
    return this.characterModel.findOne();
  }
}
