import { Controller, Post, UploadedFile, UseInterceptors, Request, Get, UseGuards, Response, StreamableFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { createReadStream } from 'fs';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { User } from './schemas/users.schema';
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
    @Get('avatar')
    async getFile(@Request() req ,@Response({ passthrough: true}) res):Promise< StreamableFile> {
        const user = await this.userService.findbyid(req.user.id);
        //console.log(user);
        if(user && user.image.length > 0)
            return await new StreamableFile(Buffer.from(user.image, 'base64'));
        return null;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async finduserbyid(@Request() req): Promise<User>{
        //console.log(req.user)
       return await this.userService.findbyid(req.user.id);
    }
}
