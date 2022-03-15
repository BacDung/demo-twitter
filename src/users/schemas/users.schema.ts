import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop(String)
    image: string;
}

export const UserSchema = SchemaFactory.createForClass(User);