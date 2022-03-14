import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/users/schemas/users.schema';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email'});
    }


    async validate(email: string, password: string): Promise<any> {
        const user = await this.authService.authentication(email, password);
        //console.log(user);
        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
      }
}