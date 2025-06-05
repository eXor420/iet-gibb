import {StoreService} from '../../shared/ngrx/store.service';
import {anything, instance, mock, verify} from 'ts-mockito';
import {SigninContainer} from "./signin.container";
import {SigninDto} from "./signin.model";

describe('SigninContainer', () => {
    let signinContainer: SigninContainer;
    let storeServiceMock: StoreService;

    beforeEach(() => {
        storeServiceMock = mock(StoreService);
        signinContainer = new SigninContainer(instance(storeServiceMock));
    });

    it('should dispatch trySignin action when signin is called', () => {
        const dto: SigninDto = {} as SigninDto;

        // act
        signinContainer.signin(dto);

        // assert
        // anything da ngrx action nicht mockable sind
        verify(storeServiceMock.dispatch(anything())).once();
    });
});
