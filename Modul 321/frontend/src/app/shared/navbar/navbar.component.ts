import { Component } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { NgIf } from "@angular/common";
import { filter, Subscription } from "rxjs";
import { ToastService } from "../ToastService";
import {AuthService} from '../auth/auth.service';

@Component({
    selector: 'app-navbar-component',
    template: `
        <div class="container">
            <div (click)="navigateToHome()" class="logo">
                <img src="./../../../assets/images/xServer_Logo_white.png" alt="logo">
            </div>

            <div class="navbar">
                <a href="/games"><p>Games</p></a>
                <a href="/imprint"><p>Contact</p></a>
                <a *ngIf="loggedIn" href="/dashboard"><p>Dashboard</p></a>
                <a *ngIf="loggedIn" href="/servers"><p>Servers</p></a>
                <div *ngIf="loggedIn" class="icon" style="margin-right: 10px;">
                    <mat-icon class="material-icons-outlined" style="color: white; transform: scale(1.2);">
                        notifications_outline
                    </mat-icon>
                </div>
                <div *ngIf="loggedIn" class="icon" style="margin-right: 30px;">
                    <mat-icon style="color: white; transform: scale(1.2);">help_outline</mat-icon>
                </div>
                <!--diverse ngif um element nur anzuzeigen wenn eingeloggt-->
                <a *ngIf="!loggedIn" href="/signin" style="margin-right: 10px"><p>Sign in</p></a>
                <a *ngIf="!loggedIn" href="/signup" style="border: 2px solid white; border-radius: 10px"><p
                    style="margin: 10px">Sign up</p></a>
                <a *ngIf="loggedIn" href="/account" style="margin-right: 10px; cursor: pointer"><p style="margin: 10px">
                    Account</p></a>
                <a *ngIf="loggedIn" (click)="signOut()"
                   style="border: 2px solid white; border-radius: 10px; cursor: pointer"><p style="margin: 10px">Sign
                    out</p></a>
            </div>

        </div>
    `,
    styles: [`
        /* custom font importieren*/
        @import url("https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined");

        .container {
            width: 100%;
            height: 70px;
            border-bottom: 2px solid #575757;
            display: flex;
            justify-content: space-between;
        }

        .navbar {
            display: flex;
            align-items: center;
        }

        .icon{
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #575757;
            border-radius: 12px;
            cursor: pointer;
        }

        .logo {
            cursor: pointer;
        }

        img {
            height: 50px;
            padding: 10px 0 10px 10px;
        }

        a{
            margin-right: 30px;
        }
    `],
    standalone: true,
    imports: [
        MatIcon,
        NgIf
    ]
})
export class NavbarComponent {

    loggedIn = false;
    private routerSubscription: Subscription;

    constructor(private router: Router, private toastService: ToastService, private authService: AuthService) {
        // subscribtion on routing um token zu checken ween routing
        this.routerSubscription = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.loggedIn =  !!authService.getToken()
        });

    }

    navigateToHome() {
        this.router.navigate(['/']);
    }

    signOut(){
        // beim abmelden token entfernen
        this.authService.removeToken()
        this.loggedIn =  !!this.authService.getToken()
        this.navigateToHome()
        this.toastService.showSuccess("Sign out succeeded");
    }
}
