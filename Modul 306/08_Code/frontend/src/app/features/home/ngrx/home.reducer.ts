import {Action, createReducer, on} from '@ngrx/store';
import * as HomeActions from './home.actions';
import {ChuckNorrisJoke} from '../home.model';

export const homeFeatureKey = 'homeFeature';

export interface HomeState {
  joke: ChuckNorrisJoke;
}

export const initialState: HomeState = {
    joke: undefined,
};

const reducer = createReducer(initialState,
  on(HomeActions.stuffLoaded, (state,  {joke}) => ({...state, joke})),
);

export const homeReducer = (state: HomeState | undefined, action: Action): HomeState => reducer(state, action);
