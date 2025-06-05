import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SignUpDto } from "./signup.model";

@Component({
    selector: 'app-signup-component',
    template: `
        <div class="container">
            <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
                <h1>Sign up :)</h1>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" formControlName="email">
                </div>
                <div>
                    <h2>Do not provide a real password!!!! the password is not stored secure</h2>
                    <label for="password">Password:</label>
                    <input type="password" id="password" formControlName="password">
                </div>
                <div>
                    <label for="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" formControlName="confirmPassword">
                </div>
                <button type="submit" [disabled]="!signupForm.valid">Sign Up</button>
            </form>


        </div>
    `,
    styles: [`
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 60vh;
        }

        h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
        }

        h2 {
            font-size: 1rem;
            color: red;
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
export class SignupComponent {

    signupForm: FormGroup;

    @Output() signup = new EventEmitter<SignUpDto>();

    constructor(private formBuilder: FormBuilder) {
        // reactive form mit validators erstellen
        this.signupForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]]
        }, {validator: passwordMatcher});
    }

    // emitter triggern fall from valid und button geklickt
    onSubmit() {
        if (this.signupForm.valid) {
            this.signup.emit(
                {
                    email: this.signupForm.get('email').value,
                    password: this.signupForm.get('password').value,
                } as SignUpDto
            );
        }
    }
}


// custom validator für password confirm
function passwordMatcher(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
        return {'mismatch': true};
    }
    return null;
}
