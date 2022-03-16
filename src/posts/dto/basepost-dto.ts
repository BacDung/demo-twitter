import { User } from "src/users/schemas/users.schema";

export class BasePostsDto{
    content: string;
    author?: User;
    file: string[];
}