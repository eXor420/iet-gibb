import { Component } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { GameComponent } from "./components/game.component";
import { Game } from "./games.model";
import { NgForOf } from "@angular/common";

@Component({
    selector: 'app-games-component',
    template: `
        <div class="container">
            <app-game-component *ngFor="let game of gameList" [game]="game"></app-game-component>

        </div>
    `,
    styles: [`
        .container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            justify-items: center;
            grid-row-gap: 20px;
            width: 98%;
            margin: 0 1%;
            padding-top: 50px;
        }

        @media (min-width: 1200px) {
            .container{
                grid-template-columns: 1fr 1fr 1fr;
                width: 80%;
                margin: 0 10%;
            }
        }

        @media (min-width: 1600px) {
            .container{
                grid-template-columns: 1fr 1fr 1fr 1fr;
            }
        }
    `],
    standalone: true,
    imports: [
        MatButton,
        GameComponent,
        NgForOf,
    ]
})
export class GamesComponent {

    gameList = [
        {
            name: "Minecraft",
            logoUrl: "./../../../../assets/images/home/slider/minecraft.png",
            backgroundUrl: "https://i.redd.it/i-found-the-hd-blank-cover-art-used-for-the-x-box-360-v0-mqpmwo8fshga1.png?width=1280&format=png&auto=webp&s=b3b6c3fce4792321f6e3c11dd7acec83fd4ae3c8",
            price: 12.99
        },
        {
            name: "Palworld",
            logoUrl: "./../../../../assets/images/home/slider/palworld.png",
            backgroundUrl: "https://static.wixstatic.com/media/f8429d_f42fa8f410f14e3fbe4a9b03bddf172e~mv2.png/v1/fill/w_640,h_996,al_t,q_90,usm_0.66_1.00_0.01,enc_auto/f8429d_f42fa8f410f14e3fbe4a9b03bddf172e~mv2.png",
            price: 15.99
        },
        {
            name: "DayZ",
            logoUrl: "./../../../../assets/images/home/slider/dayz.png",
            backgroundUrl: "https://store-images.s-microsoft.com/image/apps.25654.69886306496288395.9ec42146-6037-4440-b5c7-3a44e5213cc3.b6ce47f8-80fe-4ea3-8d04-2cfa13905bca?mode=scale&q=90&h=3840&w=2160",
            price: 9.99
        },
        {
            name: "Ark",
            logoUrl: "./../../../../assets/images/home/slider/ark.png",
            backgroundUrl: "https://store-images.s-microsoft.com/image/apps.49771.68672594993004535.abb7a42a-f75b-44f2-8afd-204cb3d19eb6.df63910d-755c-40d4-90c0-95d214d3ccd9?mode=scale&q=90&h=1080&w=1920&background=%23FFFFFF",
            price: 17.99
        },
        {
            name: "Assetto Corsa Competizione",
            logoUrl: "./../../../../assets/images/home/slider/assetto.png",
            backgroundUrl: "https://assets-prd.ignimgs.com/2022/09/16/assetto-blog-1663330589278.jpg",
            price: 14.99
        },
        {
            name: "Rust",
            logoUrl: "./../../../../assets/images/home/slider/rust.png",
            backgroundUrl: "https://static.displate.com/857x1200/displate/2022-12-02/57ab4091c28e24c9a4b9f76b6ea41ab8_46e732986bebb0dc32062f02ddfca719.jpg",
            price: 1.99
        },
        {
            name: "Satisfactory",
            logoUrl: "./../../../../assets/images/home/slider/satisfactory.png",
            backgroundUrl: "https://cdn.akamai.steamstatic.com/steam/apps/526870/ss_969cc0ee250048267ba4cbd6187dbeb93cfd285b.1920x1080.jpg?t=1711646062",
            price: 1.99
        },
    ] as Game[]
    constructor() {
    }
}
