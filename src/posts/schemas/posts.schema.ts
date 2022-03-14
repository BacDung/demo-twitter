import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Document } from "mongoose"
import { User } from "src/users/schemas/users.schema";

export type PostsDocument = Posts & Document;

@Schema()
export class Posts {
    @Prop()
    content: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Users'})
    author: User;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);