import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from "@angular/core";
import { AuthService } from "./shared/auth/auth.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    // methode zum überprüfen ob token valid ist oder überhaupt vorhanden um gewisse rounten einzuschränken
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authService.isTokenValid().pipe(
            map(isValid => {
                if (!isValid) {
                    this.authService.removeToken();
                    return false;
                }
                return true;
            })
        );
    }
}
