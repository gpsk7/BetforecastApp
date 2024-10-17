

import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { JockeyMasterService } from 'src/app/Services/jockey-master.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-jockey-master',
  templateUrl: './jockey-master.component.html',
  styleUrls: ['./jockey-master.component.css']
})
export class JockeyMasterComponent implements OnInit {
  isLoading = false;
  fileTooLarge = false; 

  totalRecords = 100;
  pageSize = 50;
  pageIndex = 0;
  isEdit: boolean = false;
  selectedFile: File | null = null;
  
  displayedColumns = [
    "id",
    "jockeyRegistrationId",
    "jockeyFirstName",
    "jockeyLastName",
    "jockeyAge",
    "jockeyGender",
    "jockeyCount",
    "jockeyCountry",
    "jockeyExperienceYears",
    "jockeyWins",
    "jockeyLosses",
    "edit",
     "delete"
  ];

  dataSource = [];

  constructor(
    private router: Router,
    private jockeyMasterService: JockeyMasterService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    //this.fetchData();
    this.loadJockeyDetails();
  }

  loadJockeyDetails() {
    const paginationQueryParams = `page=${this.pageIndex}&size=${this.pageSize}`;
    this.jockeyMasterService.getJockeysData(paginationQueryParams).subscribe(
      data => {
        if (data.jockeyDtos && data.jockeyDtos.length > 0) {
          this.dataSource = data.jockeyDtos;
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

  deleteJockey(id: number): void {
    this.jockeyMasterService.deleteJockey(id).subscribe(
      (response) => {
        if (response) {
          this.snackbarService.show(response, 'Close'); // Directly show the response string
        } else {
          this.snackbarService.show('Deleted Successfully', 'success'); // Fallback if response is empty
        }
        this.loadJockeyDetails(); // Reload the list after successful deletion
      },
      error => {
        console.error('Error deleting record:', error);
        this.snackbarService.show('Failed to delete the record!', 'error');
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
      this.jockeyMasterService.upload(this.selectedFile).subscribe({
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
    this.loadJockeyDetails();
    console.log(event);
  }

  navigateToJockeyMasteredit(data: any): void {
    this.jockeyMasterService.setEditJockey(data);
    this.router.navigate(["jockeyMasteredit"]);
  }

  // fetchData(): void {
  //   this.jockeyMasterService.getData().subscribe({
  //     next: (data) => {
  //       this.dataSource = data;
  //       console.log('Data fetched successfully:', data);
  //     },
  //     error: (error) => {
  //       console.error('There was an error fetching data!', error);
  //     }
  //   });
  // }
}

