import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UsersService],
  controllers: [UsersController],

  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),forwardRef(() => AuthModule)],

  exports: [UsersService]
})

export class UsersModule {}
