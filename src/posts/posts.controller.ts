import { Controller, Post, Get, Body, Request, UseGuards, BadRequestException, Patch, UseInterceptors, UploadedFile, Param, UploadedFiles } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { CreatePostsDto } from './dto/createpost-dto';
import { PostsService } from './posts.service';
import { UsersService } from 'src/users/users.service';
import { CommentDto, CommentRemove } from './dto/comment-dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService, private userService: UsersService){};
    
    //BASE
   
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('files'))
    @Post('register')
    async registerPosts( 
        @Body() createPost: CreatePostsDto, 
        @Request() req, 
        @UploadedFiles() files: Array<Express.Multer.File>){
       
        let buffer : string[] = [];
        for(let i = 0; i < files.length; i++){
           buffer.push(files.at(i).buffer.toString('base64'));
        }
        createPost.file = buffer;
        
        const userreq = await this.userService.findbyid(req.user.id);
        userreq.image = '';
        if(!userreq){
            throw new BadRequestException('Invalid user ObjectId');
        }
        return this.postsService.create(createPost, userreq);
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('files'))
    @Post('upload')
    async updateFile( @Param() id: string, @UploadedFile() files: Array<Express.Multer.File>, @Request() req){
        //console.log(param);
        console.log(req.user);
        console.log(id);
        const param = '';
        const posts = null//this.postsService.findById(param)
        if(posts){
            let buffer : string[] = [];
            
            for(let i = 0; i < files.length; i++){
                buffer.push(files.at(i).buffer.toString('base64'));
            }
            return this.postsService.updateFile(buffer, param);
        }
        return new BadRequestException('not found id post');
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAllPost(){
        return this.postsService.findAll();
    }

    //VOTE
    @UseGuards(JwtAuthGuard)
    @Post('vote')
    async vote(@Body() _id: string, @Request() req){
        //const post = await this.postsService.findById(_id);
        //console.log(post);
        //return await this.postsService.iUserVotePosts(_id, req.user.id);
        return await this.postsService.votePosts(_id, req.user.id);

    }

    @UseGuards(JwtAuthGuard)
    @Get('uservote')
    async getAllUserVote(@Body() _id: string){
        return this.postsService.findAllUserVotePost(_id);
    }

    //COMMENT

    @UseGuards(JwtAuthGuard)
    @Post('cmt')
    async commentPost(@Body() comment: CommentDto, @Request() req){
        return await this.postsService.comment(comment._id, req.user.id, comment.cmt);
    }


    @UseGuards(JwtAuthGuard)
    @Patch('cmt')
    async commentRemove(@Body() edit: CommentRemove){
        const post = await this.postsService.commentEdit(edit.idCmt, edit._id);
        console.log(post);
        return post;
    }


}
