import { CharacterSchema } from './../common/schemas/character.schema';
import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from 'src/common/middleware/multer-options.factory';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Character', schema: CharacterSchema }]),
    MulterModule.registerAsync({
      useFactory: () => multerOptionsFactory('character'),
    }),
  ],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}
