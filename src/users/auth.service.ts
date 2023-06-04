import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JWTPayload } from './interface/jwt.interface';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async singup(createdUser: CreateUserDto) {
    const user = await this.userService.create(createdUser);
    return user;
  }
  async signin(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JWTPayload = {
        _id: user._id.toString(),
        isAdmin: user.isAdmin,
        tokenVersion: user.tokenVersion,
      };
      const token = this.jwtService.sign(payload);
      return { accessToken: token };
    }
    throw new UnauthorizedException('Check your credintials');
  }
}
