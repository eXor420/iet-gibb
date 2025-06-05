import {StoreService} from '../../shared/ngrx/store.service';
import {anything, instance, mock, reset, verify} from 'ts-mockito';
import {ServerContainer} from "./server.container";

describe('SignupContainer', () => {
    let serverContainer: ServerContainer;
    let storeServiceMock: StoreService;

    beforeEach(() => {
        storeServiceMock = mock(StoreService);
        serverContainer = new ServerContainer(instance(storeServiceMock));
        reset(storeServiceMock);
    });

    it('should dispatch action when delete is called', () => {

        // act
        serverContainer.deleteServer("365");

        // assert
        // anything da ngrx action nicht mockable sind
        verify(storeServiceMock.dispatch(anything())).once();
    });
});
