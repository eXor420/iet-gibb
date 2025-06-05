import {createFeatureSelector, createSelector} from '@ngrx/store';
import {homeFeatureKey, HomeState} from './home.reducer';

export const homeFeature = createFeatureSelector<HomeState>(homeFeatureKey);

export const selectValue = createSelector(homeFeature, state => state.joke);
