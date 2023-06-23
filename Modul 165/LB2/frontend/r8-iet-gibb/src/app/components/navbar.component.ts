import {Component} from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <ul>
      <li><a href="/teacher">Teacher</a></li>
      <li><a href="/module">Modules</a></li>
      <li><a href="/performance">Performance</a></li>
    </ul>
  `,
  styles: [`
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: #333;
    }

    li {
      float: left;
    }

    li a {
      display: block;
      color: white;
      text-align: center;
      padding: 15px 16px;
      text-decoration: none;
      font-size: 19px;
    }

    li a:hover {
      background-color: #111;
    }
  `]
})
export class NavbarComponent {
}
