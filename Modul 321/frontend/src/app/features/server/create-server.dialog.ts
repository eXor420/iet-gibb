import { Component } from '@angular/core';
import { MatDialogClose } from "@angular/material/dialog";
import { Game, ServerDto } from "./server.model";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgForOf } from "@angular/common";
import { StoreService } from "../../shared/ngrx/store.service";
import * as ServerActions from "./ngrx/server.actions"

@Component({
    selector: 'app-server-component',
    template: `
        <div class="container">
            <div class="header">
                <h1>Create Server</h1>
            </div>

            <form [formGroup]="createForm">
                <div>
                    <label for="name">Name:</label>
                    <input type="text" id="name" formControlName="name">
                </div>
                <div>
                    <label for="game">Game:</label>
                    <select formControlName="game">
                        <option value="" disabled>Select a game</option>
                        <option *ngFor="let game of gameOptions" [value]="game">
                            {{ game }}
                        </option>
                    </select>
                </div>
            </form>

            <div class="actions">
                <button mat-dialog-close>Cancel</button>
                <button mat-dialog-close [disabled]="!createForm.valid" (click)="createServer()">Create</button>
            </div>
        </div>
    `,
    styles: [`
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: auto;
            background-color: #2d2d2d;
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 20px;
        }

        .header {
            margin-bottom: 1rem;
        }

        form {
            width: auto;
            max-width: 400px;
            border: 1px solid #ccc;
            padding: 1rem 3rem 1rem 3rem;
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

        input[type="text"],
        select {
            width: 100%;
            padding: 0.5rem;
            border-radius: 4px;
            border: 1px solid #ccc;
        }

        .actions {
            display: flex;
            justify-content: flex-end; /* Align buttons to the right */
            margin-top: 1rem; /* Add space between form and buttons */
        }

        button {
            width: auto; /* Let the button size adjust based on content */
            padding: 0.75rem;
            margin-left: 0.5rem; /* Add space between buttons */
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
        MatDialogClose,
        ReactiveFormsModule,
        NgForOf
    ]
})
export class CreateServerDialog {

    createForm: FormGroup;
    gameOptions = Object.values(Game);

    constructor(private formBuilder: FormBuilder, public storeService: StoreService) {
        this.createForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            game: ['', [Validators.required]]
        });
    }

    createServer(): void {
        if (this.createForm.valid) {
            this.storeService.dispatch(ServerActions.createServer({server: {
                    name: this.createForm.get('name').value,
                    game: this.createForm.get('game').value,
                } as ServerDto}));
        }
    }
}
