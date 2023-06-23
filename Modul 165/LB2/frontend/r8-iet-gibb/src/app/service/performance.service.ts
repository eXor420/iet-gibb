import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TeacherDto} from "../model/teacher.dto";
import {PerformanceDto} from "../model/performance.dto";

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private baseUrl = '/api/performance/';

  constructor(private http: HttpClient) {
  }

  get(): Observable<PerformanceDto> {
    return this.http.get<PerformanceDto>(this.baseUrl);
  }

  getPg(): Observable<PerformanceDto> {
    return this.http.get<PerformanceDto>(this.baseUrl + "pg");
  }
}
