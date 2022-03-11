import { Controller, Post, Get, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create_user.dto';
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UsersService) {}
    
    @Post('register')
    async registerUser(@Body() userdto: CreateUserDto){
        userdto.password = await this.authService.hashPassword(userdto.password);
        return this.userService.create(userdto);
    }

    @Post('login')
    async login(@Request() req) {
      console.log(req.user.name)
      return this.authService.login(req.user);
    }

    @Get('user')
    async finduser(){
        return this.userService.findAll();
    }
  
}
