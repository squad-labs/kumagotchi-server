import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/req.dto';
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
      completedMissions: 0,
    };
    const newCharacter = await this.characterModel.create(newCharacterData);

    return newCharacter;
  }

  async findOne(name: string) {
    return await this.characterModel.findOne({ name });
  }

  async changeImage(file: any, name: string) {
    const character = await this.characterModel.findOneAndUpdate(
      { name },
      { imageUrl: file.location },
      { new: true },
    );

    if (!character) {
      return 'Character not found';
    }

    return character;
  }
}
