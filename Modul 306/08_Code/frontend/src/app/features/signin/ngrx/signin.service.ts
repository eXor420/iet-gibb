import { EMPTY, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TokenObject } from "../signin.model";
import { environment } from "../../../../environments/environment";
import { ToastService } from "../../../shared/ToastService";
import { catchError } from "rxjs/operators";
import { SigninDto } from "../signin.model";

@Injectable({providedIn: 'root'})
export class SigninService {

    private baseURL = environment.apiBaseUrl + 'auth';

    constructor(private readonly http: HttpClient, private toastService: ToastService) {
    }

    // methode um sich anzzumelden im backend und fehler zu catchen
    public signin(dto: SigninDto): Observable<TokenObject> {
        return this.http.post<TokenObject>(`${this.baseURL}/signin`, dto).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = error.error?.error || 'Unknown backend error occurred';
                this.toastService.showError(errorMessage);
                return EMPTY;
            })
        );
    }
}
