import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { YoutubeService } from 'src/app/Services/youtube.service';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent {

  searchQuery: string = '';
  videos: any[] = [];
  selectedVideoUrl: SafeResourceUrl | null = null;
  nextPageToken: string = '';
  prevPageToken: string = '';
  apiKey: string = 'AIzaSyAT9UVHFCG7Czq3i1ytSwts86PvJwyH0Ng';

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private youtubeService: YoutubeService,
    private snackbarService: SnackbarService,
  ) {}

  searchVideos(pageToken: string = '') {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${this.searchQuery}&key=${this.apiKey}&pageToken=${pageToken}`;
    this.http.get(url).subscribe(
      (response: any) => {
        this.videos = response.items;
        this.nextPageToken = response.nextPageToken || '';
        this.prevPageToken = response.prevPageToken || '';
        this.selectedVideoUrl = null; // Close video player when new search is performed
      },
      (error) => {
        if (error.error && error.error.error && error.error.error.code === 403) {
          this.snackbarService.show('You have exceeded your YouTube API quota. Please try again later.');
        } else {
          this.snackbarService.show('An unknown error occurred. Please try again.');
        }
      }
    );
  }

  openVideo(videoId: string) {
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;
    this.selectedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

  closeVideo() {
    this.selectedVideoUrl = null;
  }

  goToNextPage() {
    if (this.nextPageToken) {
      this.searchVideos(this.nextPageToken);
    }
  }

  goToPrevPage() {
    if (this.prevPageToken) {
      this.searchVideos(this.prevPageToken);
    }
  }
}