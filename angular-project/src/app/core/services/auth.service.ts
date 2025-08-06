import { HttpClient } from "@angular/common/http";
import { inject, Injectable, OnInit, signal } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { User } from "../../shared/models/user.model";

@Injectable({
    providedIn:'root'
})
export class AuthService {
    private url:string = 'http://localhost:3000/api';
    private httpClient = inject(HttpClient);

    private _isLoggedIn = signal<boolean>(false)
    private _user = signal<User|null>(null)

    constructor(){
        const localstorageUser = localStorage.getItem('user')
        if(localstorageUser){
            this._user.set(JSON.parse(localstorageUser))
            this._isLoggedIn.set(true)
        }
    }

    register(biography:string,email:string,username:string,password:string):Observable<User>{
        return this.httpClient.post<User>(`${this.url}register`,{biography,email,username,password},{withCredentials:true}).pipe(
            tap(apiUser => {this._user.set(apiUser);
                            this._isLoggedIn.set(true)
                        })
        )
        
    }

    
}