import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModuleDto} from "../../model/module.dto";

@Component({
  selector: 'module-component',
  template: `
      <div class="container">
          <div class="card" *ngFor="let module of _modules">
              <module-card [module]="module"></module-card>
          </div>
      </div>
      <div class="add-button">
          <a (click)="createModule.emit()"><span data-attr="Add">Add</span><span data-attr="Module">Module</span></a>
      </div>
  `,
  styles: [`
    .container {
      margin-top: 30px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      justify-content: center;
    }

    /* from https://alvarotrigo.com/blog/best-css-button-hover-effects/ */
    .add-button {
      position: absolute;
      top: 14px;
      right: 0;
    }

    a {
      text-decoration: none;
      text-transform: uppercase;
      font-size: 15px;
    }

    a:hover{
      cursor: pointer;
    }

    a span {
      padding: 15px;
      transition: .5s;
      position: relative;
    }

    a span:nth-child(1) {
      color: #fff;
      background: #333;
    }

    a span:nth-child(2) {
      color: #fff;
      background: #23411c;
    }

    a span:nth-child(1):before {
      content: attr(data-attr);
      position: absolute;
      top: 0;
      left: 0;
      background: #23411c;
      padding: 15px;
      transition: 0.5S;
      transform-origin: top;
      transform: rotateX(90deg) translateY(-50%);
    }

    a:hover span:nth-child(1):before {
      transform: rotateX(0deg) translateY(0%);
    }

    a span:nth-child(2):before {
      content: attr(data-attr);
      position: absolute;
      top: 0;
      left: 0;
      background: #333;
      padding: 15px;
      transition: 0.5S;
      transform-origin: bottom;
      transform: rotateX(90deg) translateY(50%);
    }

    a:hover span:nth-child(2):before {
      transform: rotateX(0deg) translateY(0%);
    }

    a span:nth-child(1):after {
      content: attr(data-attr);
      padding: 15px;
      position: absolute;
      top: 0;
      left: 0;
      background: #333;
      transform-origin: bottom;
      transform: rotateX(0deg) translateY(0%);
      transition: 0.5s;
    }

    a:hover span:nth-child(1):after {
      transform: rotateX(90deg) translateY(50%);
    }

    a span:nth-child(2):after {
      content: attr(data-attr);
      position: absolute;
      top: 0;
      left: 0;
      background: #23411c;
      padding: 15px;
      transition: 0.5S;
      transform-origin: top;
      transform: rotateX(0deg) translateY(0%);
    }

    a:hover span:nth-child(2):after {
      transform: rotateX(90deg) translateY(-50%);
    }
  `]
})
export class ModuleComponent {
  @Output() createModule = new EventEmitter<void>();

  _modules: ModuleDto[]
  @Input()
  set modules(modules: ModuleDto[] | null) {
    if (modules) {
      this._modules = modules
    }
  }

}
