import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgIf } from "@angular/common";

@Component({
    selector: 'app-feature-component',
    template: `
        <div class="container">
            <div *ngIf="!imageRight" class="image image-l">
                <div class="image-container">

                </div>
            </div>
            <div class="content">
                <h1>FEATURES</h1>
                <ng-content></ng-content>
            </div>
            <div *ngIf="imageRight" class="image image-r">
                <div class="image-container">

                </div>
            </div>
        </div>
    `,
    styles: [`
        .container {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-top: 150px;
        }

        .image, .content {
            flex: 1;
        }
        .image{
            display: flex;
            align-items: center;
        }

        .image-container {
            width: 80%;
            height: 300px;
            background-color: #525252;
            border-radius: 25px;
        }

        .image-r{
            justify-content: end;
        }

        /* no global style because of projection*/
        h1, h2, p{
            color: white;
            font-family: "Aldrich", sans-serif;
        }

        h1{
            font-size: 20px;
            margin-bottom: 40px;
        }

        h2{
            font-size: 30px;
            margin-bottom: 70px;
        }

        p{
            margin-bottom: 70px;
        }

        /* no global style because of projection*/
        button{
            background-color: #1e94d3;
            border: none;
            padding: 15px 80px;
            border-radius: 20px;
            font-size: 20px;
            color: white;
            font-family: "Aldrich", sans-serif;
            cursor: pointer;
            transition: box-shadow 0.3s ease-in-out;
        }

        button:hover{
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.2),
            0 0 20px rgba(0, 0, 0, 0.15),
            0 0 25px rgba(0, 0, 0, 0.1),
            0 0 30px rgba(255, 255, 255, 0.25);
        }

    `],
    standalone: true,
    imports: [
        NgIf
    ],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class FeatureComponent {

    @Input()
    imageRight = false;

    constructor() {
    }
}
