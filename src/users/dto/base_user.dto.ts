export class BaseUserDto {
    readonly username: string;
    readonly email: string;
    password: string;
    readonly image?: string[];
  }