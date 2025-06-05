import { SignUpDto } from './signup.model';
import { StoreService } from '../../shared/ngrx/store.service';
import { anything, instance, mock, verify } from 'ts-mockito';
import { SignupContainer } from "./signup.container";

describe('SignupContainer', () => {
    let signupContainer: SignupContainer;
    let storeServiceMock: StoreService;

    beforeEach(() => {
        storeServiceMock = mock(StoreService);
        signupContainer = new SignupContainer(instance(storeServiceMock));
    });

    it('should dispatch trySignup action when signup is called', () => {
        const dto: SignUpDto = { } as SignUpDto;

        // act
        signupContainer.signup(dto);

        // assert
        // anything da ngrx action nicht mockable sind
        verify(storeServiceMock.dispatch(anything())).once();
    });
});
