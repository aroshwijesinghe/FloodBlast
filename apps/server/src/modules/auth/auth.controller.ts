import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsString, IsNotEmpty } from 'class-validator';

export class DeviceRegisterDto {
  @IsString()
  @IsNotEmpty()
  deviceId: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('device')
  async registerDevice(@Body() dto: DeviceRegisterDto) {
    return this.authService.registerDevice(dto.deviceId);
  }
}
