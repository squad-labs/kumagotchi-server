import { Module } from '@nestjs/common';
import { DevService } from './dev.service';
import { DevController } from './dev.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/common/schemas/users.schema';
import { CommentsSchema } from 'src/common/schemas/comments.schema';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Users', schema: UsersSchema },
      { name: 'Comments', schema: CommentsSchema },
    ]),
    TransactionModule,
  ],
  controllers: [DevController],
  providers: [DevService],
})
export class DevModule {}
