import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarContainer } from "./shared/navbar/navbar.container";
import { FooterComponent } from "./shared/footer/footer.component";
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavbarContainer, FooterComponent, MatIcon],
    template: `
        <!-- header-->
        <app-navbar-container></app-navbar-container>
        <!-- under construction warning-->
        <div class="waring">
            <mat-icon style="transform: scale(4); background-color: #ffb101; border-radius: 5px;">construction
            </mat-icon>
            <h1>This site is under construction</h1>
            <mat-icon style="transform: scale(4); background-color: #ffb101; border-radius: 5px;">construction
            </mat-icon>
        </div>
        <router-outlet></router-outlet>
        <!-- footer-->
        <app-footer-component></app-footer-component>
    `,
    styles: [`
        h1 {
            max-width: 80%;
            color: black;
            font-size: 45px;
            background-color: #ffb101;
            border-radius: 15px;
            padding: 10px;
        }

        .waring {
            width: 100%;
            background-image: repeating-linear-gradient(
                -45.1deg,
                #000,
                #000 20px,
                #ffb101 20px,
                #ffb101 40px
            );
            display: flex;
            justify-content: space-around;
            align-items: center;
            animation: moveBackground 15s linear infinite;
        }

        @keyframes moveBackground {
            from {
                background-position: 0 0;
            }
            to {
                background-position: 100vw 0;
            }
        }
    `]
})
export class AppComponent{

    // always scrollt nach oben wenn rounting
    constructor(private router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                window.scrollTo(0, 0);
            }
        });
    }

}
