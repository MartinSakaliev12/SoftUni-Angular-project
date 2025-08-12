import { HttpClient } from "@angular/common/http";
import { inject, Injectable, OnInit, signal } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { User } from "../../shared/models/user.model";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private url: string = 'http://localhost:3000/api';
    private httpClient = inject(HttpClient);

    private _isLoggedIn = signal<boolean>(false)
    private _user = signal<User | null>(null)
    private _userId = signal<string>('')

    public isLoggedIn = this._isLoggedIn.asReadonly()
    public user = this._user.asReadonly();
    public userId = this._userId.asReadonly();

    constructor() {

        const currentUser = localStorage.getItem('currentUser')
        if (currentUser) {
            const currentUserParsed = JSON.parse(currentUser)
            this._user.set(JSON.parse(currentUser))
            this._isLoggedIn.set(true)
            this._userId.set(currentUserParsed._id)
        }
    }

    register(biography: string, email: string, username: string, password: string, imageUrl: string): Observable<User> {
        return this.httpClient.post<User>(`${this.url}/register`, { biography, email, username, imageUrl, password }, { withCredentials: true }).pipe(
            tap(apiUser => {
                this._user.set(apiUser);
                this._isLoggedIn.set(true)
                this._userId.set(apiUser._id)
                localStorage.setItem('currentUser', JSON.stringify(this._user()))
            })
        )

    }

    login(email: string, password: string): Observable<User> {
        return this.httpClient.post<User>(`${this.url}/login`, { email, password }, {
            withCredentials: true,
        }).pipe(
            tap(apiUser => {
                this._user.set(apiUser);
                this._isLoggedIn.set(true);
                this._userId.set(apiUser._id)
                localStorage.setItem('currentUser', JSON.stringify(this._user()))
            }
            )
        )
    }

    logout(): Observable<void> {
        return this.httpClient.post<void>(`${this.url}/logout`, {}, {
            withCredentials: true,
        }).pipe(tap(res => {
            localStorage.removeItem('currentUser')
            this._user.set(null)
            this._isLoggedIn.set(false)
            this._userId.set('')
        }))
        //todo add to log out
    }
    editProfile(biography: string, username: string, imageUrl: string, email: string) {
        return this.httpClient.put<User>(`http://localhost:3000/api/users/profile`, { biography, username, imageUrl, email },{withCredentials:true}).pipe(
            tap((user) => {this._user.set(user)})
        )
    }

}