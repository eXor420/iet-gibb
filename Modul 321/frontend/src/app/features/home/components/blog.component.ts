import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-blog-component',
    template: `
        <div class="container">
            <h1>Read our gaming blog</h1>
            <h2>Passionate about gaming! Explore our collection of gaming-related articles and insights.</h2>
            <div class="blogs">
                <div class="line">
                    <div class="box">
                        <img src="./../../../../assets/images/home/blog/blog_1.png" width="250" height="150"
                             alt="blog post">
                        <h3>Optimizing game server performance</h3>
                        <p>Enhancing server performance is crucial for a smooth gaming experience. Discover tips and
                            tricks to...</p>
                        <div class="creator">
                            <div class="profile"></div>
                            <div class="nr">
                                <div>
                                    <p class="name">Asdf G.</p>
                                    <p class="role">Software Engineer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box">
                        <img src="./../../../../assets/images/home/blog/blog_2.png" width="250" height="150"
                             alt="blog post">
                        <h3>Innovate your gaming experience</h3>
                        <p>Innovation is essential for staying ahead in the gaming industry. Learn how to foster
                            creativity...</p>
                        <div class="creator">
                            <div class="profile"></div>
                            <div class="nr">
                                <div>
                                    <p class="name">Noobmaster69</p>
                                    <p class="role">Fortnite Player</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box">
                        <img src="./../../../../assets/images/home/blog/blog_3.png" width="250" height="150"
                             alt="blog post">
                        <h3>Balancing gaming and life</h3>
                        <p>Maintaining a healthy gaming-life balance is key to enjoying gaming without compromising
                            other aspects of your...</p>
                        <div class="creator">
                            <div class="profile"></div>
                            <div class="nr">
                                <div>
                                    <p class="name">Testuser21</p>
                                    <p class="role">Teacher</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .container {
            width: 100%;
            margin-top: 150px;
        }

        h1, h2, h3, p {
            text-align: center;
        }

        h1 {
            font-size: 40px;
            font-family: "Orbitron", sans-serif;
        }

        h2 {
            font-size: 20px;
            margin-top: 50px;
            margin-bottom: 50px;
        }

        h3 {
            font-size: 20px;
            margin-bottom: 0;
            text-align: start;
        }

        p {
            margin-top: 10px;
            text-align: start;

        }

        .line {
            display: flex;
            justify-content: space-between;
        }


        img {
            border-radius: 10px;
        }

        .box {
            background-color: #525252;
            width: 250px;
            height: 400px;
            border-radius: 10px;
            box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.3);

            /* Start with the box being invisible */
            opacity: 0;
            visibility: hidden;

            /* Transition for opacity and visibility */
            transition: opacity 2s, visibility 0s 0.5s;
            transform-origin: center;
            cursor: pointer;
        }

        .box:hover {
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.2),
            0 0 20px rgba(0, 0, 0, 0.15),
            0 0 25px rgba(0, 0, 0, 0.1),
            0 0 30px rgba(255, 255, 255, 0.25);
        }

        .box.show {
            /* Make the box visible */
            opacity: 1;
            visibility: visible;
            padding: 5px;

            /* Apply the transition for opacity immediately and delay the visibility transition */
            transition: opacity 2s, visibility 0s 0s;

            animation: wobble 0.5s ease-out 0.5s forwards;
        }

        .box.show.box:nth-of-type(2n) {
            transition: opacity 2s 0.2s, visibility 0s 0.2s;
            animation: wobble 0.5s ease-out 0.7s forwards;
        }

        .box.show.box:nth-of-type(3n) {
            transition: opacity 2s 0.4s, visibility 0s 0.4s;
            animation: wobble 0.5s ease-out 0.9s forwards;
        }


        @keyframes wobble {
            0%, 100% {
                transform: rotate(0deg) scale(1);
            }
            25% {
                transform: rotate(1deg);
            }
            50% {
                transform: rotate(-1deg) scale(1.05);
            }
            75% {
                transform: rotate(1deg);
            }
        }

        .creator {
            display: flex;
        }

        .profile {
            height: 50px;
            width: 50px;
            background-color: #1e94d3;
            border-radius: 25px;
        }

        .nr {
            display: flex;
            align-items: center;
            margin-left: 5px;
        }

        .role, .name {
            margin: 0;
            text-align: start;
        }

        .name {
            font-size: 15px;
        }

        .role {
            font-size: 12px;
        }

    `],
    standalone: true,
    imports: []
})
export class BlogComponent implements AfterViewInit, OnInit {

    boxes: HTMLCollectionOf<Element>;

    constructor() {
    }

    ngOnInit(): void {
        window.addEventListener('scroll', this.checkBoxes.bind(this));
    }

    ngAfterViewInit() {
        this.boxes = document.getElementsByClassName("box")
        this.checkBoxes()
    }


    checkBoxes() {
        const triggerBottom = window.innerHeight / 5 * 4;
        for (let i = 0; i < this.boxes.length; i++) {
            const box = this.boxes[i];
            if (box.getBoundingClientRect().top < triggerBottom) {
                box.classList.add('show');
            } else {
                box.classList.remove('show');
            }
        }
    }
}
