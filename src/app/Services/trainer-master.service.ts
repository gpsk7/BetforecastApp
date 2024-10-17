import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainerMasterService {

  private baseUrl: string = '/api/v1/admin/trainer';
  trainerEdit: any;

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  }

  upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.baseUrl}/upload`, formData, { responseType: 'json' });
  }
  

    setEditTrainer(data:any){
      this.trainerEdit= data;
    }
    getEditTrainer(){
      return this.trainerEdit;
    }

    createTrainer(data:any):Observable<any>{
      return this.http.post<any>(`${this.baseUrl}`,data);
    }

    updateTrainer(data:any): Observable<any>{
      return this.http.put(`${this.baseUrl}`, data, { responseType: 'text' });
    }

    getTrainerDetails(queryParams:String):Observable<any>{
      return this.http.get<any>(`${this.baseUrl}` + (queryParams ? "?" + queryParams: ""));
    }
  deleteTrainer(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${id}`, {
      responseType: 'text' as 'json'
    });
  }

}
