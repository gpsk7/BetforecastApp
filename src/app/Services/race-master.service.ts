import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RaceMasterService {

  RaceEdit:any;
  private baseUrl: string = '/api/v1/admin/race';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.baseUrl}/upload`, formData, { responseType: 'json' });
  }

  setEditRaceMaster(data: any) {
    this.RaceEdit = data;
  }

  getEditRaceMaster() {
    return this.RaceEdit;
  }

  createRaceMaster(data:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/createRace`, data);
  }
  updateRaceMaster(data: any): Observable<any> {
    // return this.http.put<any>(`${this.baseUrl}/updateRace`, data,this.httpOptions);
    return this.http.put(`${this.baseUrl}/updateRace`, data, { responseType: 'text' });
  }

  getRaceMasterData(queryParams: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getRace` + (queryParams ? "?" + queryParams : ""));
  }
  getRaceReverseData(queryParams: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getRaceInReverse` + (queryParams ? "?" + queryParams : ""));
  }
  deleteRace(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${id}`, {
      responseType: 'text' as 'json'
    });
  }
}