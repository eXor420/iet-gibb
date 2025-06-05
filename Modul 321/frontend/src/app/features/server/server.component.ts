import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { CreateServerDialog } from "./create-server.dialog";
import { ServerDto } from './server.model';
import { NgForOf, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-server-component',
    template: `
        <div class="container">
            <div class="header">
                <h1>Your Servers</h1>
                <button (click)="openDialog()">Create Server</button>
            </div>
            <div *ngIf="servers.length > 0" class="content">
                <table>
                    <tr class="table-header">
                        <th><p>Name</p></th>
                        <th><p>URL</p></th>
                        <th><p>Game</p></th>
                        <th><p>RAM</p></th>
                        <th><p>CPU</p></th>
                        <th></th>
                    </tr>
                    <tr class="table-element" *ngFor="let s of servers">
                        <td><p>{{ s.name }}</p></td>
                        <td><p style="margin: 0">{{ s.url }}</p>
                            <p style="margin: 0">192.168.1.141:{{ s.nodePort }}</p>
                        </td>
                        <td><p>{{ s.game }}</p></td>
                        <td><p>n/a</p></td>
                        <td><p>n/a</p></td>
                        <td>
                            <button (click)="delete(s._id)">
                                <mat-icon style="color: white">delete</mat-icon>
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
            <div *ngIf="servers.length === 0" class="content">
                <h2 style="text-align: center; margin: 50px 0; font-size: 20px">You don't have any servers :( <br> Lets create one!</h2>
            </div>
        </div>
    `,
    styles: [`
        .container {
            width: 70%;
            margin-right: 15%;
            margin-left: 15%;
            margin-top: 30px;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .header button {
            padding: 10px;
            border-radius: 10px;
            font-size: 25px;
            color: white;
        }

        td button {
            height: 40px;
            width: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ff4d4d;
        }

        table {
            width: 100%;
            border: #1e94d3 solid 1px;
            border-collapse: collapse;
        }

        .table-header {
            background-color: #1e94d3;
        }

        .table-element:nth-child(even) {
            background-color: #1f1f1f;
        }

        .table-element:hover {
            background-color: #484848;
        }

        td, th {
            padding-left: 10px;
        }

        p {
            text-align: start;
        }
    `],
    standalone: true,
    imports: [
        MatButton,
        NgForOf,
        MatIcon,
        NgIf
    ]
})
export class ServerComponent {

    @Input()
    servers: ServerDto[] = [];

    @Output() deleteServer = new EventEmitter<string>();

    constructor(public dialog: MatDialog) {
    }

    openDialog() {
        this.dialog.open(CreateServerDialog);
    }

    delete(serverId: string): void {
        this.deleteServer.emit(serverId)
    }
}
