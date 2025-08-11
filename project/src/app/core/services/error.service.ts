import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class ErrorService{
    private _errorMessage = signal<string|null>(null)

    errorMessage = this._errorMessage.asReadonly()

    setError(error:string){
        this._errorMessage.set(error)
        setTimeout(()=>{
            this._errorMessage.set(null)
        },3000)
    }

}