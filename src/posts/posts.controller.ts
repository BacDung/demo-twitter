import { Controller, Post, Get, Body, Request, UseGuards, BadRequestException, Patch } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { CreatePostsDto } from './dto/createpost-dto';
import { PostsService } from './posts.service';
import { UsersService } from 'src/users/users.service';
import { CommentDto } from './dto/comment-dto';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService, private userService: UsersService){};
    
    //BASE
    @UseGuards(JwtAuthGuard)
    @Post('register')
    async registerPosts(@Body() createPost: CreatePostsDto, @Request() req){
        const userreq = await this.userService.findbyid(req.user.id);
        userreq.image = '';
        if(!userreq){
            throw new BadRequestException('Invalid user ObjectId');
        }
        return this.postsService.create(createPost, userreq);
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
    async commentEdit(@Body() _id: string){
        return await this.postsService.commentEdit(_id);
    }


}
