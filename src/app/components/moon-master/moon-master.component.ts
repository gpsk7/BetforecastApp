import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MoonMasterService } from 'src/app/Services/moon-master.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-moon-master',
  templateUrl: './moon-master.component.html',
  styleUrls: ['./moon-master.component.css']
})
export class MoonMasterComponent {
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
    "moonDay",
    "edit",
     "delete"
  ];

  dataSource = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private moonMasterService: MoonMasterService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.loadMoonDetails();
  }

  loadMoonDetails() {
    const paginationQueryParams = `page=${this.pageIndex}&size=${this.pageSize}`;
    this.moonMasterService.getMoonData(paginationQueryParams).subscribe(
      data => {
        if (data.moonDayDtos && data.moonDayDtos.length > 0) {
          this.dataSource = data.moonDayDtos;
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
      this.moonMasterService.upload(this.selectedFile).subscribe({
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

 handlePageEvent(event: PageEvent){
    this.totalRecords = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadMoonDetails();
    console.log(event);
    
  }
  
  navigateToMoonMasterEdit(data: any){
    this.moonMasterService.setEditMoon(data);
      this.router.navigate(["moonMasterEdit"]);
    }

deleteMoon(id: number): void {
  this.moonMasterService.deleteMoon(id).subscribe(
    (response) => {
      if (response) {
        this.snackbarService.show(response, 'Close'); // Directly show the response string
      } else {
        this.snackbarService.show('Deleted Successfully', 'success'); // Fallback if response is empty
      }
      this.loadMoonDetails(); // Reload the list after successful deletion
    },
    error => {
      console.error('Error deleting record:', error);
      this.snackbarService.show('Failed to delete the record!', 'error');
    }
  );
}
}

