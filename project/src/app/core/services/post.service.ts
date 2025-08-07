import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../../shared/models/post.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})
export class postService {
    
    private url = "http://localhost:3000/api/articles"

    constructor(private httpClient: HttpClient){

    }

    getPosts():Observable<Post[]>{
        return this.httpClient.get<Post[]>(this.url)
    }
    getDetailsPost(postId:string):Observable<Post>{
        return this.httpClient.get<Post>(`${this.url}/${postId}`)
    }
    
}