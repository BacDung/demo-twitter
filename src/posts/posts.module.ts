import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Posts, PostsSchema } from './schemas/posts.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Posts.name, schema: PostsSchema}]), AuthModule, UsersModule],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
