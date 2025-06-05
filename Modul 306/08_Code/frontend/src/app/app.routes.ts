import {Routes} from '@angular/router';
import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {homeFeatureKey, homeReducer} from './features/home/ngrx/home.reducer';
import {HomeEffects} from './features/home/ngrx/home.effects';
import {HomeContainer} from './features/home/home.container';
import {ImprintComponent} from './features/imprint/imprint.component';
import { AuthGuard } from "./auth.guard";
import { SigninContainer } from "./features/signin/signin.container";
import { SignupContainer } from "./features/signup/signup.container";
import { SignupEffects } from "./features/signup/ngrx/signup.effects";
import { SigninEffects } from "./features/signin/ngrx/signin.effects";
import { GamesContainer } from "./features/games/games.container";
import {AccountContainer} from './features/account/account.container';
import {ServerContainer} from "./features/server/server.container";
import {ServerEffects} from "./features/server/ngrx/server.effects";
import {serverFeature} from "./features/server/ngrx/server.selectors";
import {serverFeatureKey, serverReducer} from "./features/server/ngrx/server.reducer";


// use canActivate: [AuthGuard] to secure a route
export const routes: Routes = [
    {path: '', component: HomeContainer, providers: [
            provideState(homeFeatureKey, homeReducer),
            provideEffects([HomeEffects])
        ],},
    {path: 'signin', component: SigninContainer, providers: [
            provideEffects([SigninEffects])
        ],},
    {path: 'signup', component: SignupContainer, providers: [
            provideEffects([SignupEffects])
        ],},
    {path: 'account', component: AccountContainer, canActivate: [AuthGuard]},
    // authgaurd welcher nur access erlaubt wenn eingeloggt und ngrx providers
    {path: 'servers', component: ServerContainer, canActivate: [AuthGuard], providers: [
            provideState(serverFeatureKey, serverReducer),
            provideEffects([ServerEffects])
        ]},
    {path: 'games', component: GamesContainer},
    {path: 'imprint', component: ImprintComponent},
    {path: '**', redirectTo: '/', pathMatch: 'full'},
];
