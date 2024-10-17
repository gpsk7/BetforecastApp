import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JockeyMasterService {
  JockeyEdit:any;
  private baseUrl: string = '/api/v1/admin/jockey';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.baseUrl}/upload`, formData, { responseType: 'json' });
  }
  
  setEditJockey(data: any) {
    this.JockeyEdit = data;
  }

  getEditJockey() {
    return this.JockeyEdit;
  }

  createJockey(data:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}`, data);
  }
  // updateJockey(data: any): Observable<any> {
  //   return this.http.put<any>(`${this.baseUrl}`, data,{ responseType: 'text' });
  // }

  updateJockey(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}`, data, { responseType: 'text' });
  }
  

  getJockeysData(queryParams: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}` + (queryParams ? "?" + queryParams : ""));
  }
  deleteJockey(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${id}`, {
      responseType: 'text' as 'json'
    });
  }
}
