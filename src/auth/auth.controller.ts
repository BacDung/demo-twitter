import { Controller, Post, Get, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create_user.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/auth.guard';


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
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        //console.log(req.user);
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('user')
    async finduser(@Request() req){
        return req.user;
    }
  
}
