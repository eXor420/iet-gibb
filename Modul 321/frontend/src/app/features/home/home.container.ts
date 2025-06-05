import { Component } from '@angular/core';
import { HomeComponent } from './home.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-home-container',
    template: `
        <app-home-component></app-home-component>
    `,
    standalone: true,
    imports: [
        HomeComponent,
        AsyncPipe
    ]
})
export class HomeContainer {
    constructor() {
    }
}
