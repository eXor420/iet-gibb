import {Action, MemoizedSelector, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// store service um ngrx einfacher zu bedienen
export class StoreService {

  constructor(private readonly store: Store) {
  }

  // selector observen
  observe<R>(selector: MemoizedSelector<object, R>): Observable<R> {
    return this.store.select(selector);
  }

  // action triggern
  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
