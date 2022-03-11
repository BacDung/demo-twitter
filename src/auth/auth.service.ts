import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service'; 
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
      private jwtService: JwtService,
      private userService: UsersService   
    ){};

    async login(user: any){
        const payload = {id: user.id, username: user.username , email: user.email};
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async authentication(email: string, password: string): Promise<any>{
        const user = await this.userService.findOne(email);
        if(user && this.comparePassword(password, user.password)){
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 11);
    }

    async comparePassword(password: string, storePasswordHash: string): Promise<any> {
        return await bcrypt.compare(password, storePasswordHash);
    }

}
