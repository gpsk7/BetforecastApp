import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InplayMasterService {

  private baseUrl: string = '/api/v1/inplay';
  InplayEdit: any;

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  }

  setEditInplay(data: any) {
    this.InplayEdit = data;
  }

  getEditInplay() {
    return this.InplayEdit;
  }

  upload(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file, file.name);
  return this.http.post(`${this.baseUrl}/upload`, formData, { responseType: 'json' });
}


  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, data);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}`, data, { responseType: 'text' });
  }
  
  getInplayData(queryParams: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}` + (queryParams ? "?" + queryParams : ""));
  }
  deleteInplay(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${id}`, {
      responseType: 'text' as 'json'
    });
  }
  
  searchInplayByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/${name}`);
  }
}
