import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NatureoftheDayService {

  private baseUrl: string = '/api/v1/nature';
  natureEdit: any;

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  }

  setEditNature(data: any) {
    this.natureEdit = data;
  }

  getEditNature() {
    return this.natureEdit;
  }

  

  upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.baseUrl}/upload`, formData, { responseType: 'json' });
  }


  createNature(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, data);
  }

  updateNature(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, data, { responseType: 'text' });
  }

  getNatureData(queryParams: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/all` + (queryParams ? "?" + queryParams : ""));
  }
  // getNatureData(page: number, size: number): Observable<any> {
  //   let params = new HttpParams()
  //     .set('page', page.toString())
  //     .set('size', size.toString());

  //   return this.http.get<any>(`${this.baseUrl}/all`, { params });
  // }

  deleteNatureOfTheDay(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${id}`, {
      responseType: 'text' as 'json'
    });
  }
}

