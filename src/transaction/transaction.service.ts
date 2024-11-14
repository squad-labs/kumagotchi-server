import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ethers } from 'ethers';
import { Model } from 'mongoose';
import { Users } from 'src/common/schemas/users.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TransactionService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private network: string;

  constructor(
    @InjectModel('Users')
    private usersModel: Model<Users>,

    private configService: ConfigService,
  ) {
    this.provider = new ethers.JsonRpcProvider(
      this.configService.get('chain.endpoint'),
    );
    this.wallet = new ethers.Wallet(
      this.configService.get('chain.serviceKey'),
      this.provider,
    );
    this.network = this.configService.get('chain.network');
  }
}
