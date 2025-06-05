import {createAction, props} from '@ngrx/store';
import {ChuckNorrisJoke} from '../home.model';

export const loadStuff = createAction('[Home] load');
export const stuffLoaded = createAction('[Home] loaded', props<{joke: ChuckNorrisJoke}>());
