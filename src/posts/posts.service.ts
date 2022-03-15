import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Posts, PostsDocument } from './schemas/posts.schema';
import { CreatePostsDto } from './dto/createpost-dto';
import { User } from 'src/users/schemas/users.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Posts.name) private postsModel: Model<PostsDocument>,
        private userService: UsersService
        ,){};
    
    //base
    async create(creatPostDto: CreatePostsDto, author: User): Promise<Posts>{
        const newPost = new this.postsModel({
            ...creatPostDto,
            author,
        });
        return newPost.save();
    }

    async findAll(): Promise<Posts[]>{
        return this.postsModel.find().exec();
    }

    async findById(id: string): Promise<Posts>{
        return this.postsModel.findById(id).exec();
    }
    //


    //vote
    async votePosts(id: string, user: string){
        const checkUser = await this.iUserVotePosts(id, user);
        if(!checkUser)
            return this.postsModel.findByIdAndUpdate(id, {$push: {vote: user}});
        return this.postsModel.findByIdAndUpdate(id,{$pull: {vote: user}});
    }

    async findAllUserVotePost(id: string){
        const post = await this.findById(id)
        const listUser = post.vote;
        return await this.userService.findArrUser(listUser);
    }

    async iUserVotePosts(id: string, userId: string): Promise<boolean>{
        const post = this.postsModel.find({vote: {"$in": [ userId ]}});
        if((await post).length == 0) return false;
        return true;
    }
    //

    //comment
    async comment(id: string, user: string, cmt: string){
        return this.postsModel.findByIdAndUpdate(id, 
            {$push: 
                {comment: 
                    {user: user, 
                    cmt: cmt}
                }
            }
        );
    }

    async commentEdit( idCmt: string){
        return this.postsModel.find({comment: {id: idCmt}});
    }

}
