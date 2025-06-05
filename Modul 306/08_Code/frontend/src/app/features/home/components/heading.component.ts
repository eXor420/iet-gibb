import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatButton } from "@angular/material/button";
import { Router } from "@angular/router";

@Component({
    selector: 'app-heading-component',
    template: `
        <div class="container">
            <div class="text">
                <div>
                    <h1>Host your game <br> server with us!</h1>
                    <ul>
                        <li><mat-icon style="color: white; transform: scale(1.3)">check_circle_outline</mat-icon><p>99.9% Uptime</p></li>
                        <li><mat-icon style="color: white; transform: scale(1.3)">check_circle_outline</mat-icon><p>Completely customizable</p></li>
                        <li><mat-icon style="color: white; transform: scale(1.3)">check_circle_outline</mat-icon><p>Low latency</p></li>
                        <li><mat-icon style="color: white; transform: scale(1.3)">check_circle_outline</mat-icon><p>Simple management</p></li>
                    </ul>
                    <button (click)="navigateToSignup()" >Get started now!</button>
                </div>
            </div>
            <div>
                <img src="./../../../../assets/images/home/server.png" alt="serv image">
            </div>
        </div>
    `,
    styles: [`
        .container {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-top: 40px;
        }

        button{
            padding: 15px 80px;
            font-size: 20px;
            color: white;
            animation: scaleAnimation 2s infinite;
            transition: box-shadow 0.3s ease-in-out;
        }

        button:hover{
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.2),
            0 0 20px rgba(0, 0, 0, 0.15),
            0 0 25px rgba(0, 0, 0, 0.1),
            0 0 30px rgba(255, 255, 255, 0.25);
        }

        @keyframes scaleAnimation {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.03);
            }
        }

        .text {
            display: flex;
            align-items: center;
        }

        h1 {
            font-size: 40px;
        }

        p {
            margin: 0 10px;
            font-size: 20px;
        }

        li {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }

        ul {
            list-style-type: none;
            padding: 0;
        }

        img {
            height: 450px;
        }
    `],
    standalone: true,
    imports: [
        MatIcon,
        MatButton
    ]
})
export class HeadingComponent {

    constructor(private router: Router) {
    }

    navigateToSignup(){
        this.router.navigate(['/signup']);
    }
}
