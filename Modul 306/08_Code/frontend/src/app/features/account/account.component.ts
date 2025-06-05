import { Component } from '@angular/core';
import { MatButton } from "@angular/material/button";

@Component({
    selector: 'app-account-component',
    template: `
        <div class="container">
            <h1>Account</h1>
        </div>
    `,
    styles: [`
        .container {

        }
    `],
    standalone: true,
    imports: [
        MatButton
    ]
})
export class AccountComponent {
    constructor() {
    }
}
