import { Component } from '@angular/core';
import { NavbarComponent } from './navbar.component';

@Component({
    selector: 'app-navbar-container',
    template: `
        <app-navbar-component></app-navbar-component>
    `,
    standalone: true,
    imports: [
        NavbarComponent,
    ]
})
export class NavbarContainer {

    constructor() {
    }
}
