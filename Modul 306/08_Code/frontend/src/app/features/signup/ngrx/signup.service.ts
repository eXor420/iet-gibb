import { EMPTY, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SignUpDto, TokenObject } from "../signup.model";
import { environment } from "../../../../environments/environment";
import { ToastService } from "../../../shared/ToastService";
import { catchError } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class SignupService {

    private baseURL = environment.apiBaseUrl + 'auth';

    constructor(private readonly http: HttpClient, private toastService: ToastService) {
    }

    // methode um im backend user zu erstellen und fehler zu catchen
    public signup(dto: SignUpDto): Observable<TokenObject> {
        return this.http.post<TokenObject>(`${this.baseURL}/signup`, dto).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = error.error?.error || 'Unknown backend error occurred';
                this.toastService.showError(errorMessage);
                return EMPTY;
            })
        );
    }
}
