import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ethers } from 'ethers';
import { Model } from 'mongoose';
import { Users } from 'src/common/schemas/users.schema';
import { ConfigService } from '@nestjs/config';
import { PoolInReqDto } from './dto/req.dto';
import { UsersService } from 'src/users/users.service';
import { Character } from 'src/common/schemas/character.schema';
import { CONSTANTS } from 'src/common/config/constants';
import { PoolIn } from 'src/common/schemas/poolIn.schema';

@Injectable()
export class TransactionService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private network: string;

  constructor(
    @InjectModel('Users')
    private usersModel: Model<Users>,
    @InjectModel('Character')
    private characterModel: Model<Character>,
    @InjectModel('PoolIn')
    private poolInModel: Model<PoolIn>,

    private readonly usersService: UsersService,
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

  async poolIn(data: PoolInReqDto) {
    let userInfo = await this.usersModel.findOneAndUpdate(
      {
        wallet: data.wallet,
      },
      {
        $inc: { poolIn: data.tokenAmount },
      },
      { new: true },
    );

    await this.characterModel.findOneAndUpdate(
      { name: 'KUMAGOTCHI' },
      {
        $inc: { poolIn: data.tokenAmount },
      },
      { new: true },
    );

    if (!userInfo) {
      const newUser = {
        wallet: data.wallet,
        poolIn: data.tokenAmount,
      };

      const createdUser = await this.usersService.create(newUser);
      userInfo = await this.usersModel.findById(createdUser.userId);
    }

    const result = {
      ...userInfo.toObject(),
      userId: userInfo._id,
    };
    delete result._id;

    await this.poolInModel.create({
      wallet: data.wallet,
      chain: data.chain,
      poolIn: data.tokenAmount,
    });

    return result;
  }

  getPoolAddress() {
    return {
      poolAddress: CONSTANTS,
    };
  }

  async getPoolAmount(userId: string) {
    const userInfo = await this.usersModel.findById(userId);
    const characterInfo = await this.characterModel.findOne({
      name: 'KUMAGOTCHI',
    });

    return {
      userPoolIn: userInfo.poolIn,
      totalPoolIn: characterInfo.poolIn,
    };
  }
}
