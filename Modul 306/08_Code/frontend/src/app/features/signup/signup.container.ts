import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { SignupComponent } from "./signup.component";
import { SignUpDto } from "./signup.model";
import { StoreService } from "../../shared/ngrx/store.service";
import * as SignupActions from './ngrx/signup.actions';

@Component({
    selector: 'app-signup-container',
    template: `
        <app-signup-component (signup)="signup($event)"></app-signup-component>
    `,
    standalone: true,
    imports: [
        AsyncPipe,
        SignupComponent
    ]
})
export class SignupContainer {
    constructor(public storeService: StoreService) {
    }

    signup(dto: SignUpDto){
        this.storeService.dispatch(SignupActions.trySignup({dto}))
    }
}
