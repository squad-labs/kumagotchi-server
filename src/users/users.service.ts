import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginReqDto } from './dto/req.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/common/schemas/users.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users')
    private usersModel: Model<Users>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async create(data: LoginReqDto) {
    const { wallet } = data;

    const userInfo = await this.usersModel.findOne({ wallet });

    if (userInfo) {
      const accessToken = this.generateAccessToken(userInfo._id.toString());

      return {
        userId: userInfo._id.toString(),
        ens: userInfo.ens,
        profileImg: userInfo.profileImg,
        accessToken,
        createdAt: userInfo.createdAt,
      };
    }

    const newUser = await this.usersModel.create(data);
    const accessToken = this.generateAccessToken(newUser._id.toString());

    return {
      userId: newUser._id.toString(),
      accessToken,
      ens: userInfo.ens,
      profileImg: userInfo.profileImg,
      createdAt: newUser.createdAt,
    };
  }

  async findOne(userId: string) {
    const accessToken = this.generateAccessToken(userId);
    const refreshToken = this.generateRefreshToken(userId);

    const userInfo = await this.usersModel.findByIdAndUpdate(
      userId,
      { refreshToken },
      { new: true },
    );

    if (!userInfo) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      userId: userInfo._id,
      wallet: userInfo.wallet,
      timezone: userInfo.timezone,
      ens: userInfo.ens,
      profileImg: userInfo.profileImg,
      accessToken,
      refreshToken,
      createdAt: userInfo.createdAt,
    };
  }

  async refresh(token: string, userId: string) {
    const refreshTokenInfo = await this.usersModel.findOne({
      _id: userId,
      refreshToken: token,
    });

    if (!refreshTokenInfo)
      throw new HttpException('Invalid refresh token', HttpStatus.BAD_REQUEST);

    const accessToken = this.generateAccessToken(userId);
    const refreshToken = this.generateRefreshToken(userId);
    refreshTokenInfo.refreshToken = refreshToken;

    await refreshTokenInfo.save();

    return { accessToken, refreshToken };
  }

  private generateAccessToken(userId: string) {
    const payload = { sub: userId, tokenType: 'access' };
    return this.jwtService.sign(payload, { expiresIn: '30d' });
  }

  private generateRefreshToken(userId: string) {
    const payload = { sub: userId, tokenType: 'refresh' };
    return this.jwtService.sign(payload, { expiresIn: '30d' });
  }
}
