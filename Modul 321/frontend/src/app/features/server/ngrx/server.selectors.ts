import {createFeatureSelector, createSelector} from '@ngrx/store';
import {serverFeatureKey, ServerState} from './server.reducer';

export const serverFeature = createFeatureSelector<ServerState>(serverFeatureKey);

export const selectServers = createSelector(serverFeature, state => state.servers);
