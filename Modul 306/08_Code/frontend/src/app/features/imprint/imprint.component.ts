import {Component} from '@angular/core';

@Component({
    selector: 'app-imprint-component',
    template: `
        <div class="container">
            <h1>Imprint xServer</h1>
            <h2>This is a school project of the IET Gibb.</h2>
            <a href="mailto:p.a.tu1996@hotmail.com"><p>p.a.tu1996 (at) hotmail.com</p></a>
            <p>
                Patrick Aeschlimann <br>
                Bäraustrasse 78 <br>
                3552 Bärau
            </p>
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
    imports: []
})
export class ImprintComponent{

    constructor() {
    }
}
