import { Component } from '@angular/core';
import { GamesComponent } from './games.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-games-container',
    template: `
        <app-games-component></app-games-component>
    `,
    standalone: true,
    imports: [
        GamesComponent,
        AsyncPipe
    ]
})
export class GamesContainer {
    constructor() {
    }
}
