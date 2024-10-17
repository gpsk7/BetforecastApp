import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private apiKey: string = 'AIzaSyAT9UVHFCG7Czq3i1ytSwts86PvJwyH0Ng';
  private baseUrl: string = 'https://www.googleapis.com/youtube/v3/search';

  constructor(private http: HttpClient) { }

  searchVideos(query: string, pageToken: string = ''): Observable<any> {
    const url = `${this.baseUrl}?part=snippet&maxResults=5&q=${query}&key=${this.apiKey}&pageToken=${pageToken}`;
    return this.http.get<any>(url);
  }
}
