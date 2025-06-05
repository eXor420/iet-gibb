import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ChuckNorrisJoke} from '../home.model';

@Injectable({providedIn: 'root'})
export class HomeService {

    constructor(private readonly http: HttpClient) {
    }

    public register(): Observable<ChuckNorrisJoke> {
        return this.http.get<ChuckNorrisJoke>(`https://api.chucknorris.io/jokes/random`)
    }
}
