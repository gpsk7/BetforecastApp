import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RaceMasterService } from 'src/app/Services/race-master.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-race-master',
  templateUrl: './race-master.component.html',
  styleUrls: ['./race-master.component.css']
})
export class RaceMasterComponent implements OnInit{
  isLoading = false;
  fileTooLarge = false; 

  totalRecords = 100;
  pageSize = 50;
  pageIndex = 0;
  isEdit: boolean = false;
  selectedFile: File | null = null;
  
  displayedColumns = [
    "id",
    "date",
    "course",
    "country",
    "raceId",
    "distance",
    "raceNumber",
    "time",
    // "raceType",
    "horseName",
    "horseWeight",
    "age",
    // "horseColour",
    "jockeyName",
    "trainerName",
    "speed",
    // "btnDistance",
    "drawnStall",
    "horseBallot",
    "finishPos",
    "dayValue",
    // "horseNameCount",
    // "jockeyNameCount",
    // "trainerNameCount",
    "form",
    "edit",
     "delete"
  ];

  dataSource = [];

  constructor(
    private router: Router,
    private raceMasterService: RaceMasterService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    //this.fetchData();
    this.loadRaceMasterDetails();
  }

  loadRaceMasterDetails() {
    const paginationQueryParams = `page=${this.pageIndex}&size=${this.pageSize}`;
    this.raceMasterService.getRaceMasterData(paginationQueryParams).subscribe(
      data => {
        if (data.raceDtos && data.raceDtos.length > 0) {
          this.dataSource = data.raceDtos;
          this.totalRecords = data.totalCount;
        } else {
          this.dataSource = [];
          this.totalRecords = 0;
          this.snackbarService.show('No data found!.');
        }
      },
      error => {
        console.error('Error fetching data:', error);
        this.snackbarService.show('No Data Found!');
      }
    );
  }

  deleteRace(id: number): void {
    this.raceMasterService.deleteRace(id).subscribe(
      (response) => {
        if (response) {
          this.snackbarService.show(response, 'Close'); // Directly show the response string
        } else {
          this.snackbarService.show('Deleted Successfully', 'success'); // Fallback if response is empty
        }
        this.loadRaceMasterDetails(); // Reload the list after successful deletion
      },
      error => {
        console.error('Error deleting record:', error);
        this.snackbarService.show('Failed to delete the record!', 'error');
      }
    );
  }
  
  

  fetchRaceDetailsInReverse(): void {
    const paginationQueryParams = `page=${this.pageIndex}&size=${this.pageSize}`;
    this.raceMasterService.getRaceReverseData(paginationQueryParams).subscribe(
      data => {
        this.dataSource = data.raceDtos;
        this.totalRecords = data.totalCount;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.size > 1000000) { // Check if file exceeds 1MB (1000000 bytes)
        this.fileTooLarge = true;
        this.selectedFile = null; // Reset the selected file
        input.value = ''; // Clear the input
      } else if (file.type === 'text/csv') {
        this.fileTooLarge = false;
        this.selectedFile = file;
        console.log('CSV file selected:', file);
      } else {
        this.fileTooLarge = false;
        alert('Please select a CSV file.');
        input.value = ''; // Clear the input
      }
    }
  }

  uploadFile(): void {
    if (this.selectedFile && !this.fileTooLarge) {
      this.isLoading = true;
      this.raceMasterService.upload(this.selectedFile).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log(response);
          alert(response.message);
        },
        error: (err) => {
          this.isLoading = false;
          console.error('There was an error!', err);

          if (err.error.error && err.error.error.includes('Invalid number format')) {
            this.snackbarService.show(
              'Invalid number format',
              'close'
            );
          } else {
            alert('File upload failed: ' + (err.error.error));
          }
        }
      });
    } else {
      this.isLoading = false;
      if (!this.selectedFile) {
        this.snackbarService.show('No file selected or invalid file type.', 'error');
      } else if (this.fileTooLarge) {
        this.snackbarService.show('File size should not exceed 1MB/1000KB.', 'error');
      }
    }
  }

  handlePageEvent(event: PageEvent): void {
    this.totalRecords = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadRaceMasterDetails();
    console.log(event);
  }

  navigateToRaceMasterEdit(data: any): void {
    console.log(data)
    this.raceMasterService.setEditRaceMaster(data);
    this.router.navigate(["/raceMasterEdit"]);
  }
}