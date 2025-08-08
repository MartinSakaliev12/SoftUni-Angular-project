import { User } from "./user.model";

export interface Post{
    _id:string,
    title:string,
    imageUrl:string,
    description:string,
    userId:User
}