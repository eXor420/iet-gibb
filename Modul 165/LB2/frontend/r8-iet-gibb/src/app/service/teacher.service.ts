import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TeacherDto} from "../model/teacher.dto";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private baseUrl = '/api/teacher/'; // Replace with your API endpoint

  constructor(private http: HttpClient) {
  }

  getTeachers(): Observable<TeacherDto[]> {
    return this.http.get<TeacherDto[]>(this.baseUrl);
  }

  create(teacher: TeacherDto): Observable<void> {
    return this.http.post<void>(this.baseUrl, teacher)
  }

  save(teacher: TeacherDto): Observable<void> {
    return this.http.put<void>(this.baseUrl + teacher._id, teacher)
  }

  delete(id: string): Observable<any> {
    return this.http.delete<void>(this.baseUrl + id)
  }
}
