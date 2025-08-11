import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../../shared/models/post.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})
export class PostService {
    
    private url = "http://localhost:3000/api/articles"

    constructor(private httpClient: HttpClient){

    }

    getPosts():Observable<Post[]>{
        return this.httpClient.get<Post[]>(this.url)
    }
    getDetailsPost(postId:string|null):Observable<Post>{
        return this.httpClient.get<Post>(`${this.url}/${postId}`)
    }
    createPost(title:string, imageUrl:string, description:string){
        return this.httpClient.post<Post>(`${this.url}`, {title,imageUrl,description},{withCredentials:true})
    }
    editPost(title:string,imageUrl:string,description:string,postId:string|null){
        return this.httpClient.put<Post>(`${this.url}/${postId}/edit`,{title,imageUrl,description},{withCredentials:true})
    }
    deletePost(postId:string|null){
        return this.httpClient.delete<Post>(`${this.url}/${postId}/delete`,{withCredentials:true})
    }
    like(postId:string|null){
        return this.httpClient.put<Post>(`${this.url}/${postId}/like`,{},{withCredentials:true})
    }
    dislike(postId:string|null){
        return this.httpClient.put<Post>(`${this.url}/${postId}/dislike`,{},{withCredentials:true})
    }
}