import {anything, instance, mock, verify} from 'ts-mockito';
import {ServerComponent} from "./server.component";
import {MatDialog} from "@angular/material/dialog";

describe('ServerComponent', () => {
    let serverComponent: ServerComponent;
    let dialog: MatDialog;

    beforeEach(() => {
        dialog = mock(MatDialog);
        serverComponent = new ServerComponent(instance(dialog));
    });

    it('should dispatch open dialog when openDialog is called', () => {

        // act
        serverComponent.openDialog();

        // assert
        verify(dialog.open(anything())).once();
    });

    it('should emit deleteServer event with the correct server ID when delete method is called', () => {
        const serverId = '123';
        jest.spyOn(serverComponent.deleteServer, 'emit');

        serverComponent.delete(serverId);

        expect(serverComponent.deleteServer.emit).toHaveBeenCalledWith(serverId);
    });
});
