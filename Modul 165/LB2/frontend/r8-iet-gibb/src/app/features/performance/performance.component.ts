import {Component, Input} from '@angular/core';
import {PerformanceDto} from "../../model/performance.dto";

@Component({
  selector: 'performance-component',
  template: `
      <div class="container">
          <div class="aside"></div>
          <div class="content">
              <h1 class="mongotxt">MongoDB Stats</h1>
              <div class="stats">
                  <div class="stat">
                      <h2 class="mongotxt">Create:</h2>
                      <div [matTooltip]="'Create 10000 records'" id="create" class="mongo" role="progressbar"
                           aria-valuemin="0" aria-valuemax="200"
                           style="{{create}}"></div>
                  </div>
                  <div class="stat">
                      <h2 class="mongotxt">Read:</h2>
                      <div [matTooltip]="'Read 10000 records'" id="read" class="mongo" role="progressbar"
                           aria-valuemin="0" aria-valuemax="200" style="{{read}}"></div>
                  </div>
                  <div class="stat">
                      <h2 class="mongotxt">Delete:</h2>
                      <div [matTooltip]="'Delete 10000 records'" id="delete" class="mongo" role="progressbar"
                           aria-valuemin="0" aria-valuemax="200"
                           style="{{delete}}"></div>
                  </div>
              </div>
              <h1 class="psqltxt" id="psql">PostgresSQL Stats</h1>
              <div class="stats">
                  <div class="stat">
                      <h2 class="psqltxt">Create:</h2>
                      <div [matTooltip]="'Create 10000 records'" id="createPg" class="pg" role="progressbar"
                           aria-valuemin="0" aria-valuemax="200"
                           style="{{createPg}}"></div>
                  </div>
                  <div class="stat">
                      <h2 class="psqltxt">Read:</h2>
                      <div [matTooltip]="'Read 10000 records'" id="readPg" class="pg" role="progressbar"
                           aria-valuemin="0" aria-valuemax="200" style="{{readPg}}"></div>
                  </div>
                  <div class="stat">
                      <h2 class="psqltxt">Delete:</h2>
                      <div [matTooltip]="'Delete 10000 records'" id="deletePg" class="pg" role="progressbar"
                           aria-valuemin="0" aria-valuemax="200"
                           style="{{deletePg}}"></div>
                  </div>
              </div>
          </div>
          <div class="aside"></div>
          <h2 id="warning">
              <mat-icon style="transform: scale(1.3);">warning</mat-icon>
              Please note that the following performance analysis is based on the device and the database client
              used. The measured times are for 10,000 records without relations. Results may vary depending on
              hardware, network conditions, and other factors.
          </h2>
      </div>
  `,
  styles: [`
    .container {
      display: grid;
      grid-template-columns: 1fr 4fr 1fr;
    }

    h1, h2 {
      text-align: center;
    }

    h1 {
      font-size: 35px;
      margin-top: 30px;
    }

    #psql {
      margin-top: 70px;
    }

    .psqltxt {
      color: #34cdff;
    }

    .mongotxt {
      color: #69f0ae;
    }

    .stats {
      display: flex;
      justify-content: center;
    }

    .stat {
      flex: 1;
    }

    #warning {
      position: absolute;
      bottom: 25px;
      padding: 0 250px;
    }

    @keyframes growProgressBar {
      0%, 11% {
        --pgPercentage: 0;
      }
      100% {
        --pgPercentage: var(--value);
      }
    }

    @property --pgPercentage {
      syntax: '<number>';
      inherits: false;
      initial-value: 0;
    }

    .animate {
      animation: growProgressBar 1s 1 forwards;
    }

    .mongo[role="progressbar"] {
      margin-right: auto !important;
      margin-left: auto !important;
      --size: 12rem;
      --fg: #69f0ae;
      --bg: #224f38;
      --pgPercentage: calc(var(--value) * 200 / 100);
      width: var(--size);
      height: var(--size);
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: radial-gradient(closest-side, #424242 80%, transparent 0 99.9%, white 0),
      conic-gradient(var(--fg) calc(var(--pgPercentage) / 200 * 100%), var(--bg) 0);
      font-family: Helvetica, Arial, sans-serif;
      font-size: calc(var(--size) / 5);
      color: var(--fg);
    }

    .mongo[role="progressbar"]::before {
      counter-reset: percentage var(--value);
      content: counter(percentage) 'ms';
    }

    .pg[role="progressbar"] {
      margin-right: auto !important;
      margin-left: auto !important;
      --size: 12rem;
      --fg: #34cdff;
      --bg: #153a46;
      --pgPercentage: calc(var(--value) * 200 / 100);
      width: var(--size);
      height: var(--size);
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: radial-gradient(closest-side, #424242 80%, transparent 0 99.9%, white 0),
      conic-gradient(var(--fg) calc(var(--pgPercentage) / 200 * 100%), var(--bg) 0);
      font-family: Helvetica, Arial, sans-serif;
      font-size: calc(var(--size) / 5);
      color: var(--fg);
    }

    .pg[role="progressbar"]::before {
      counter-reset: percentage var(--value);
      content: counter(percentage) 'ms';
    }
  `]
})
export class PerformanceComponent {

  create = "--value:" + 0
  read = "--value:" + 0
  delete = "--value:" + 0
  createPg = "--value:" + 0
  readPg = "--value:" + 0
  deletePg = "--value:" + 0

  @Input()
  set performance(performance: PerformanceDto) {
    if (performance != null) {
      this.create = "--value:" + performance.createTime;
      this.read = "--value:" + performance.readTime;
      this.delete = "--value:" + performance.deleteTime;

      const progressbarCreate = document.getElementById('create');
      const progressbarRead = document.getElementById('read');
      const progressbarDelete = document.getElementById('delete');

      progressbarCreate.style.setProperty('--pgPercentage', this.create);
      progressbarRead.style.setProperty('--pgPercentage', this.read);
      progressbarDelete.style.setProperty('--pgPercentage', this.delete);

      progressbarCreate.classList.add('animate');
      progressbarRead.classList.add('animate');
      progressbarDelete.classList.add('animate');
    }

  };

  @Input()
  set performancePg(performancePg: PerformanceDto) {
    if (performancePg != null) {
      this.createPg = "--value:" + performancePg.createTime;
      this.readPg = "--value:" + performancePg.readTime;
      this.deletePg = "--value:" + performancePg.deleteTime;

      const progressbarCreatePg = document.getElementById('createPg');
      const progressbarReadPg = document.getElementById('readPg');
      const progressbarDeletePg = document.getElementById('deletePg');

      progressbarCreatePg.style.setProperty('--pgPercentage', this.createPg);
      progressbarReadPg.style.setProperty('--pgPercentage', this.readPg);
      progressbarDeletePg.style.setProperty('--pgPercentage', this.deletePg);

      progressbarCreatePg.classList.add('animate');
      progressbarReadPg.classList.add('animate');
      progressbarDeletePg.classList.add('animate');
    }

  };
}
