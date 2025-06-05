import { Component } from '@angular/core';
import { AccountComponent } from './account.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-account-container',
    template: `
        <app-account-component></app-account-component>
    `,
    standalone: true,
    imports: [
        AccountComponent,
        AsyncPipe
    ]
})
export class AccountContainer {
    constructor() {
    }
}
