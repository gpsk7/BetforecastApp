import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MoonMasterService {

  private baseUrl: string = '/api/v1/admin/MoonDay';
  MoonEdit: any;

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  }

  setEditMoon(data: any) {
    this.MoonEdit = data;
  }

  getEditMoon() {
    return this.MoonEdit;
  }

  // upload(file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('file', file, file.name);
  //   return this.http.post<any>(`${this.baseUrl}/upload`, formData);
  // }

  upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.baseUrl}/upload`, formData, { responseType: 'json' });
  }


  createMoon(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, data);
  }

  updateMoon(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, data, { responseType: 'text' });
  }
  
  getMoonData(queryParams: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/all` + (queryParams ? "?" + queryParams : ""));
  }
  deleteMoon(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${id}`, {
      responseType: 'text' as 'json'
    });
  }
}
