import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorseMasterService {

  private baseUrl: string = '/api/v1/admin/horse';
  HorseEdit: any;

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  }

  setEditHorse(data: any) {
    this.HorseEdit = data;
  }

  getEditHorse() {
    return this.HorseEdit;
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


  createHorse(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, data);
  }

  updateHorse(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}`, data, { responseType: 'text' });
  }
  
  getHorseesData(queryParams: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}` + (queryParams ? "?" + queryParams : ""));
  }
  deleteHorse(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${id}`, {
      responseType: 'text' as 'json'
    });
  }
  
  searchHorsesByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/${name}`);
  }
}