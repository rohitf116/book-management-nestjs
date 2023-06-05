import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { Types } from 'mongoose';
import { ValidateObjectId } from 'src/decorators/validObjectId.decorator';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/login-user.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Serialize(UserDto)
  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.singup(createUserDto);
  }

  @Post('signin')
  @Public()
  async singIn(@Body() userLoginDto: UserLoginDto) {
    return this.authService.signin(userLoginDto.email, userLoginDto.password);
  }
  //

  @Serialize(UserDto)
  @Get()
  findAll(@Req() req: any) {
    console.log(req.user);
    return this.usersService.findAll();
  }
  @Serialize(UserDto)
  @Get(':id')
  findOne(@ValidateObjectId() id: Types.ObjectId) {
    return this.usersService.findOne(id);
  }
  @Serialize(UserDto)
  @Patch(':id')
  update(
    @ValidateObjectId() id: Types.ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@ValidateObjectId() id: Types.ObjectId) {
    return this.usersService.remove(id);
  }
}
