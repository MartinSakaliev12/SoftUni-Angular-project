import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "../../shared/models/user.model";

@Injectable({
    providedIn:'root'
})
export class ProfileService{
    private url:string = "http://localhost:3000/api/users" 

    private httpClient = inject(HttpClient)

    getProfile(userId:string|null){
        return this.httpClient.get<User>(`${this.url}/${userId}/profile`)
    }
}