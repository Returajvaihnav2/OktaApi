import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import SugarLevel from '../models/SugarLevel';

@Injectable()
export default class SugarLevelService {
  public API = 'https://localhost:44313/api';
  public SUGARLEVELS_API = `${this.API}/ListItems`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<SugarLevel>> {
    return this.http.get<Array<SugarLevel>>(this.SUGARLEVELS_API);
  }

  get(id: string) {
    return this.http.get(`${this.SUGARLEVELS_API}/${id}`);
  }

  save(sugarLevel: SugarLevel): Observable<SugarLevel> {
    let result: Observable<SugarLevel>;
    if (sugarLevel.id) {
      result = this.http.put<SugarLevel>(
        `${this.SUGARLEVELS_API}/${sugarLevel.id}`,
        sugarLevel
      );
    } else {
      result = this.http.post<SugarLevel>(this.SUGARLEVELS_API, sugarLevel);
    }
    return result;
  }

  remove(id: number) {
    return this.http.delete(`${this.SUGARLEVELS_API}/${id.toString()}`);
  }
}