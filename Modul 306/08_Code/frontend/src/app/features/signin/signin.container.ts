import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { SigninComponent } from "./signin.component";
import { StoreService } from "../../shared/ngrx/store.service";
import * as SigninActions from "./ngrx/signin.actions";
import { SigninDto } from "./signin.model";

@Component({
    selector: 'app-signin-container',
    template: `
        <app-signin-component (signin)="signin($event)"></app-signin-component>
    `,
    standalone: true,
    imports: [
        AsyncPipe,
        SigninComponent
    ]
})
export class SigninContainer {
    constructor(public storeService: StoreService) {
    }

    signin(dto: SigninDto){
        this.storeService.dispatch(SigninActions.trySignin({dto}))
    }
}
