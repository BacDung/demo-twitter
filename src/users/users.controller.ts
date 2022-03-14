import { Controller, Post, UploadedFile, UseInterceptors, Request, Get, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){};

    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req) {
        return this.userService.updateimate(req.user.id, file.buffer.toString('base64'));
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    finduserbyid(@Request() req){
       return req.user;
    }
}
