import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import * as mongoose from "mongoose";
import { Document } from "mongoose"
import { User } from "src/users/schemas/users.schema";

export type PostsDocument = Posts & Document;

@Schema()
export class Posts {
    @Prop()
    content: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: User.name})
    @Type(() => User)
    author: User;
    
    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: User.name}])
    vote: User[];

    @Prop(raw([{
        user: { type: mongoose.Schema.Types.ObjectId, ref: User.name },
        cmt: { type: String }
    }]))
    comment: Record<any, string>;
    
}

export const PostsSchema = SchemaFactory.createForClass(Posts);