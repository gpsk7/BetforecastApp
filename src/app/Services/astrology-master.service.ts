import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AstrologyMasterService {

  private baseUrl: string = '/api/v1/admin/astrology';
  AstrologyEdit: any;

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  }

  setEditAstrology(data: any) {
    this.AstrologyEdit = data;
  }

  getEditAstrology() {
    return this.AstrologyEdit;
  }

  upload(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file, file.name);
  return this.http.post(`${this.baseUrl}/upload`, formData, { responseType: 'json' });
}


  createAstrology(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, data);
  }
  

  updateAstrology(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}`, data, { responseType: 'text' });
  }
  
  getAstrologyData(queryParams: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}` + (queryParams ? "?" + queryParams : ""));
  }

  deleteAstrology(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${id}`, {
      responseType: 'text' as 'json'
    });
  }
}