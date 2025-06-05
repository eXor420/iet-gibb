import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'app-slider-component',
    template: `
        <div class="container">
            <h1>Trusted by 3+ gamers worldwide</h1>
            <div (click)="navigateToGames()" class="slider-container">
                <div class="slider">
                    <div class="slide-track">
                        <div class="slide">
                            <img src="./../../../../assets/images/home/slider/minecraft.png" height="100"
                                 width="250" alt=""/>
                        </div>
                        <div class="slide">
                            <img src="./../../../../assets/images/home/slider/palworld.png" height="100"
                                 width="250" alt=""/>
                        </div>
                        <div class="slide">
                            <img src="./../../../../assets/images/home/slider/dayz.png" height="100"
                                 width="250" alt=""/>
                        </div>
                        <div class="slide">
                            <img src="./../../../../assets/images/home/slider/ark.png" height="100"
                                 width="250" alt=""/>
                        </div>
                        <div class="slide">
                            <img src="./../../../../assets/images/home/slider/assetto.png" height="100"
                                 width="250" alt=""/>
                        </div>
                        <div class="slide">
                            <img src="./../../../../assets/images/home/slider/rust.png" height="100"
                                 width="250" alt=""/>
                        </div>
                        <div class="slide">
                            <img src="./../../../../assets/images/home/slider/satisfactory.png" height="100"
                                 width="250" alt=""/>
                        </div>
                        <div class="slide">
                            <img src="./../../../../assets/images/home/slider/minecraft.png" height="100"
                                 width="250" alt=""/>
                        </div>
                        <div class="slide">
                            <img src="./../../../../assets/images/home/slider/palworld.png" height="100"
                                 width="250" alt=""/>
                        </div>
                        <div class="slide">
                            <img src="./../../../../assets/images/home/slider/dayz.png" height="100"
                                 width="250" alt=""/>
                        </div>
                        <div class="slide">
                            <img src="./../../../../assets/images/home/slider/ark.png" height="100"
                                 width="250" alt=""/>
                        </div>
                        <div class="slide">
                            <img src="./../../../../assets/images/home/slider/assetto.png" height="100"
                                 width="250" alt=""/>
                        </div>
                        <div class="slide">
                            <img src="./../../../../assets/images/home/slider/rust.png" height="100"
                                 width="250" alt=""/>
                        </div>
                        <div class="slide">
                            <img src="./../../../../assets/images/home/slider/satisfactory.png" height="100"
                                 width="250" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrl: "./slider.component.scss",
    standalone: true,
    imports: [
    ]
})
export class SliderComponent {

    constructor(private router: Router) {
    }

    navigateToGames() {
        this.router.navigate(['/games']);
    }
}
