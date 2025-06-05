import { Component } from '@angular/core';

@Component({
    selector: 'app-footer-component',
    template: `
        <div class="container">
            <div class="content">
                <h1>Help & <br> Resources</h1>
                <div class="links">
                    <div class="link-field">
                        <h2>Contact</h2>
                        <a href="mailto:p.a.tu1996@hotmail.com"><p>p.a.tu1996 (at) hotmail.com</p></a>
                        <a href="https://linkedin.com"><p>Linkedin</p></a>
                        <a href="https://discord.com"><p>Discord</p></a>
                        <a href="https://instagram.com"><p>Instagram</p></a>
                    </div>
                    <div class="link-field">
                        <h2>Important</h2>
                        <a href="/imprint"><p>Imprint</p></a>
                        <a href="/tag"><p>Terms and Conditions</p></a>
                        <a href="/protection"><p>Data protection</p></a>
                        <a href="/technologies"><p>Technologies and partners</p></a>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`

        .container {
            width: 100%;
            height: 200px;
            border-top: 2px solid #575757;
            margin-top: 50px;
        }

        .content {
            width: 70%;
            margin: 0 15%;
            display: flex;
            justify-content: space-between;
        }

        h1 {
            font-size: 30px;
        }

        h2 {
            font-size: 20px;
        }

        p{
            font-size: 15px;
        }

        .links{
            display: flex;
        }

        .link-field{
            margin-left: 30px;
        }

    `],
    standalone: true,
    imports: []
})
export class FooterComponent {

    loggedIn = false;

    constructor() {
    }

}
