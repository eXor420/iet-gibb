import {Component} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {NavbarContainer} from "./shared/navbar/navbar.container";
import {FooterComponent} from "./shared/footer/footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavbarContainer, FooterComponent],
    template: `
        <!-- header-->
        <app-navbar-container></app-navbar-container>
        <router-outlet></router-outlet>
        <!-- footer-->
        <app-footer-component></app-footer-component>
    `
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
