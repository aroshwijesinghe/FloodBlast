import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../database/entities/user.entity';
import { UserType } from '@floodblast/shared-types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registers a new anonymous device user and returns a JWT
   * @param deviceId Unique identifier for the device
   */
  async registerDevice(deviceId: string) {
    let user = await this.userRepository.findOne({ where: { device_id: deviceId } });
    
    if (!user) {
      user = this.userRepository.create({
        device_id: deviceId,
        user_type: UserType.BASIC,
      });
      await this.userRepository.save(user);
    }
    
    const payload = { sub: user.id, type: user.user_type, device_id: user.device_id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        user_type: user.user_type,
        device_id: user.device_id
      }
    };
  }
}
