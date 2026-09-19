import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../database/entities/user.entity';
import { UserType, TrustedRole } from '@floodblast/shared-types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getProfile(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(userId: string, data: Partial<UserEntity>): Promise<UserEntity> {
    await this.userRepository.update(userId, data);
    return this.getProfile(userId);
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async approveTrusted(id: string): Promise<UserEntity> {
    await this.userRepository.update(id, {
      is_trusted_approved: true,
      user_type: UserType.TRUSTED,
    });
    return this.getUserById(id);
  }
}
