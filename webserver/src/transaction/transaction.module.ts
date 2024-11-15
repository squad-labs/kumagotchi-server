import { CharacterSchema } from '../common/schemas/character.schema';
import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { UsersSchema } from 'src/common/schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { PoolInSchema } from 'src/common/schemas/poolIn.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Users', schema: UsersSchema },
      { name: 'Character', schema: CharacterSchema },
      { name: 'PoolIn', schema: PoolInSchema },
    ]),
    UsersModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
