import { Post } from "./post.model";

export interface User{
    _id:string,
    username:string,
    email:string,
    biography:string,
    imageUrl:string,
    articles:Post[]
}