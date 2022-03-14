import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Express } from 'express'

export type UserDocument = User & Document;

@Schema()
export class User {

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