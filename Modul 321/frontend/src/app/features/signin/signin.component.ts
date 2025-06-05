import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SigninDto } from "./signin.model";

@Component({
    selector: 'app-signin-component',
    template: `
        <div class="container">
            <form [formGroup]="signinForm" (ngSubmit)="onSubmit()">
                <h1>Sign in :)</h1>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" formControlName="email">
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" id="password" formControlName="password">
                </div>
                <button type="submit" [disabled]="!signinForm.valid">Sign In</button>
            </form>


        </div>
    `,
    styles: [`
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 50vh;
        }

        h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
        }

        form {
            width: 100%;
            max-width: 400px;
            border: 1px solid #ccc;
            padding: 1rem 3rem 3rem 3rem;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            background-color: #232323;
        }

        form div {
            margin: 0 18px 1rem 0;
        }

        label {
            font-weight: bold;
            color: white;
            display: block;
            margin-bottom: 0.5rem;
        }

        input[type="email"],
        input[type="password"] {
            width: 100%;
            padding: 0.5rem;
            border-radius: 4px;
            border: 1px solid #ccc;
        }

        button {
            width: 100%;
            padding: 0.75rem;
            margin-top: 1rem;
            border-radius: 4px;
            border: none;
            background-color: #007bff;
            color: #fff;
            font-size: 1rem;
            cursor: pointer;
        }

        button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
    `],
    standalone: true,
    imports: [
        ReactiveFormsModule
    ]
})
export class SigninComponent {

    signinForm: FormGroup;

    @Output() signin = new EventEmitter<SigninDto>();

    constructor(private formBuilder: FormBuilder) {
        // reactive from für login
        this.signinForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit() {
        if (this.signinForm.valid) {
            this.signin.emit(
                {
                    email: this.signinForm.get('email').value,
                    password: this.signinForm.get('password').value,
                } as SigninDto
            );
        }
    }
}
