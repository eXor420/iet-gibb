import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { jwtDecode } from "jwt-decode";



@Injectable({providedIn: 'root'})
export class AuthService {
    private baseURL = environment.apiBaseUrl + 'auth';
    constructor(private readonly http: HttpClient) {
    }

    public getToken(): string{
        // token aus localstorage holen
        return localStorage.getItem('auth_token');
    }

    public isTokenValid(): Observable<boolean> {
        const t = this.getToken();

        // checken ob token vorhanden
        if (!t){
            return of(false);
        }
        // http headers vorbereiten
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': `Bearer ${t}`
            }),
            observe: 'response' as 'response'
        };
        // im backend checken ob token valid
        return this.http.get<HttpResponse<any>>(`${this.baseURL}/validate-token`, httpOptions)
            .pipe(
                map(response => response.status === 200),
                catchError(() => {
                    return of(false);
                })
            );
    }

    // email addresse aus token auslesen
    getEmailFromToken(): any {
        const t = this.getToken();
        try {
            // @ts-ignore
            return jwtDecode(t).email;
        } catch(Error) {
            return null;
        }
    }

    // token aus localstorage entferen
    removeToken(): void{
        localStorage.removeItem('auth_token')
    }

    // http header mit dem auth header erstellen
    createAuthHttpHeaders(): HttpHeaders{
        return new HttpHeaders({
            'Authorization': `Bearer ${this.getToken()}`
        });
    }


}
