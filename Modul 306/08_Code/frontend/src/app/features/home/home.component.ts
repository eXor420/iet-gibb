import { Component } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { HeadingComponent } from "./components/heading.component";
import { SliderComponent } from "./components/slider.component";
import { FeatureComponent } from "./components/feature.component";
import { BlogComponent } from "./components/blog.component";

@Component({
    selector: 'app-home-component',
    template: `
        <div class="container">
            <app-heading-component></app-heading-component>
            <app-slider-component></app-slider-component>

            <!--Features-->
            <app-feature-component>
                <h2>Easy setup and management</h2>
                <p>We offer game server hosting services tailored to your needs, ensuring seamless gameplay experiences
                    for you and your players.</p>
                <button>Discover more</button>
            </app-feature-component>
            <app-feature-component [imageRight]="true">
                <h2>Simplicity at its best</h2>
                <p>Our streamlined approach to game server hosting guarantees high performance without unnecessary
                    complications. We prioritize efficiency and effectiveness for an optimal gaming experience.</p>
                <button>Explore now</button>
            </app-feature-component>
            <app-feature-component>
                <h2>Easy setup and management</h2>
                <p>We offer game server hosting services tailored to your needs, ensuring seamless gameplay experiences
                    for you and your players.</p>
                <button>Discover more</button>
            </app-feature-component>

            <app-blog-component></app-blog-component>

        </div>
    `,
    styles: [`
        .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 70%;
            margin: 0 15%;
        }
    `],
    standalone: true,
    imports: [
        MatButton,
        HeadingComponent,
        SliderComponent,
        FeatureComponent,
        BlogComponent
    ]
})
export class HomeComponent{

    constructor() {
    }
}
