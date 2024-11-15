import { Module } from '@nestjs/common';
import { DevService } from './dev.service';
import { DevController } from './dev.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/common/schemas/users.schema';
import { TransactionModule } from 'src/transaction/transaction.module';
import { ChatSchema } from 'src/common/schemas/chat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Users', schema: UsersSchema },
      { name: 'Chat', schema: ChatSchema },
    ]),
    TransactionModule,
  ],
  controllers: [DevController],
  providers: [DevService],
})
export class DevModule {}
