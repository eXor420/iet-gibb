import {Action, createReducer, on} from '@ngrx/store';
import * as ServerActions from './server.actions';
import {ServerDto} from '../server.model';

export const serverFeatureKey = 'serverFeature';

export interface ServerState {
  servers: ServerDto[];
}

export const initialState: ServerState = {
    servers: [],
};

const reducer = createReducer(initialState,
  on(ServerActions.serversLoaded, (state,  {servers}) => ({...state, servers})),
);

export const serverReducer = (state: ServerState | undefined, action: Action): ServerState => reducer(state, action);
