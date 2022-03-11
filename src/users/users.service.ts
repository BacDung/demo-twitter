import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create_user.dto';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private usermodel: Model<UserDocument>){};

    
    async findAll(): Promise<User[]>{
        return await this.usermodel.find().exec();
    }

    async findOne(email: string): Promise<User>{
        return await this.usermodel.findOne({email: email});
    }

    async create(createuser: CreateUserDto): Promise<User>{
        const userNew = new this.usermodel(createuser);
        return userNew.save();
    }
}
