import { EMPTY, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { ToastService } from "../../../shared/ToastService";
import { catchError } from "rxjs/operators";
import { ServerDto } from "../server.model";
import { AuthService } from "../../../shared/auth/auth.service";

@Injectable({providedIn: 'root'})
export class ServerService {

    private baseURL = environment.apiBaseUrl + 'server';

    constructor(private readonly http: HttpClient, private toastService: ToastService, private authService: AuthService) {
    }

    public create(server: ServerDto): Observable<null> {
        return this.http.post<null>(`${this.baseURL}`, server, {headers: this.authService.createAuthHttpHeaders()}).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = error.error?.error || 'Unknown backend error occurred';
                this.toastService.showError(errorMessage);
                return EMPTY;
            })
        );
    }

    public delete(serverId: string): Observable<null> {
        return this.http.delete<null>(`${this.baseURL}/${serverId}`, {headers: this.authService.createAuthHttpHeaders()}).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = error.error?.error || 'Unknown backend error occurred';
                this.toastService.showError(errorMessage);
                return EMPTY;
            })
        );
    }

    public loadAll(): Observable<ServerDto[]> {
        return this.http.get<ServerDto[]>(`${this.baseURL}`, {headers: this.authService.createAuthHttpHeaders()}).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = error.error?.error || 'Unknown backend error occurred';
                this.toastService.showError(errorMessage);
                return EMPTY;
            })
        );
    }
}
