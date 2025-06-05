import { Component, Input } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { Game } from "../games.model";

@Component({
    selector: 'app-game-component',
    template: `
        <div class="parent">
            <div class="container">
                <div [style.background-image]="'url(' + game.backgroundUrl + ')'" class="image-container">
                    <!--            let the h1 stay for alignment of the logo-->
                    <h1></h1>
                    <img [src]="game?.logoUrl" alt="logo">
                    <h1></h1>
                    <h1 class="title">{{ game?.name }}</h1>


                </div>
                <div class="price">
                    <h1>{{game?.price}}</h1>
                    <p>$ per month</p>
                </div>
            </div>
        </div>


    `,
    styles: [`
        .parent{
            overflow: hidden;
        }

        .image-container {
            width: 300px;
            height: 400px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            filter: grayscale(50%) brightness(90%);
            transition: filter 0.3s ease;
        }

        .image-container:hover {
            filter: grayscale(0%) brightness(90%);
        }

        .title {
            margin-left: 15px;
            margin-bottom: 5px;
        }

        img {
            max-width: 250px;
            margin: 0 25px;
            filter: grayscale(50%) brightness(90%);
            transition: max-width 0.3s ease, margin 0.3s ease, filter 0.7s ease;;
        }

        .price {
            display: flex;
            align-items: end;
            width: 300px;
            background-color: #1e1e1e;
            padding: 15px 0;
        }

        .price h1 {
            margin: 0 0 0 15px;
        }

        .price p {
            margin-bottom: 5px;
        }

        .container {
            position: relative;
            cursor: pointer;
            max-width: 300px;
            top: 0;
            transition: top 0.3s ease;
        }

        .container:hover .image-container img {
            max-width: 300px;
            margin: 0;
            filter: grayscale(0%) brightness(90%);
        }

        .container:hover{
            top: -5px;
        }
    `],
    standalone: true,
    imports: [
        MatButton,
    ]
})
export class GameComponent {

    @Input()
    game: Game;

    constructor() {
    }
}
