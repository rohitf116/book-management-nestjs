import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './users/contants';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rohit_sonawane:SuperSu@cluster0.e9hjfiy.mongodb.net/nest-bookmanagement',
    ),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
