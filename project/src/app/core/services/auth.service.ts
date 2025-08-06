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

    public isLoggedIn = this._isLoggedIn.asReadonly()
    public user = this._user.asReadonly();
    constructor(){
        
        const currentUser = localStorage.getItem('currentUser')
        if(currentUser){
            this._user.set(JSON.parse(currentUser))
            this._isLoggedIn.set(true)
        }
    }

    register(biography:string,email:string,username:string,password:string):Observable<User>{
        return this.httpClient.post<User>(`${this.url}/register`,{biography,email,username,password},{withCredentials:true}).pipe(
            tap(apiUser => {this._user.set(apiUser);
                            this._isLoggedIn.set(true)
                            localStorage.setItem('currentUser',JSON.stringify(this._user()))
                        })
        )
        
    }

    login(email:string,password:string):Observable<User>{
        return this.httpClient.post<User>(`${this.url}/login`,{email,password}).pipe(
            tap(apiUser => {
                            this._user.set(apiUser);
                            this._isLoggedIn.set(true);
                            localStorage.setItem('currentUser',JSON.stringify(this._user()))
                }
            )
        )
    }

    logout():void{
        localStorage.removeItem('currentUser')
        this._user.set(null)
        this._isLoggedIn.set(false)
    }
    
}