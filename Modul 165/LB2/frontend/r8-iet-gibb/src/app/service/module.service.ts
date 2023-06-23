import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ModuleDto} from "../model/module.dto";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private baseUrl = '/api/module/'; // Replace with your API endpoint

  constructor(private http: HttpClient) {
  }

  getModules(): Observable<ModuleDto[]> {
    return this.http.get<ModuleDto[]>(this.baseUrl);
  }

  create(module: ModuleDto): Observable<void> {
    return this.http.post<void>(this.baseUrl, module)
  }

  save(module: ModuleDto): Observable<void> {
    return this.http.put<void>(this.baseUrl + module._id, module)
  }

  delete(id: string): Observable<any> {
    return this.http.delete<void>(this.baseUrl + id)
  }
}
