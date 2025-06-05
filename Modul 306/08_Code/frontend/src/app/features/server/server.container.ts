import {Component} from '@angular/core';
import * as ServerActions from './ngrx/server.actions';
import * as ServerSelectors from './ngrx/server.selectors';
import {StoreService} from '../../shared/ngrx/store.service';
import {Observable} from 'rxjs';
import {ServerComponent} from './server.component';
import {ServerDto} from './server.model';
import {AsyncPipe} from '@angular/common';

@Component({
    selector: 'app-server-container',
    template: `
        <app-server-component [servers]="$servers | async" (deleteServer)="deleteServer($event)"></app-server-component>
    `,
    standalone: true,
    imports: [
        ServerComponent,
        AsyncPipe
    ]
})
export class ServerContainer {

    $servers: Observable<ServerDto[]>;

    constructor(public storeService: StoreService) {
        this.storeService.dispatch(ServerActions.loadServers());
        this.$servers = this.storeService.observe(ServerSelectors.selectServers);
    }

    deleteServer(serverId: string): void{
        this.storeService.dispatch(ServerActions.deleteServer({serverId}));
    }
}
