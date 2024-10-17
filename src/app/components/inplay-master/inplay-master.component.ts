import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { InplayMasterService } from 'src/app/Services/inplay-master.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-inplay-master',
  templateUrl: './inplay-master.component.html',
  styleUrls: ['./inplay-master.component.css']
})
export class InplayMasterComponent {

  isLoading = false;
  fileTooLarge = false; 
 

  totalRecords = 100;
  pageSize = 50;
  pageIndex = 0;
  isEdit: boolean = false;
  selectedFile: File | null = null;
  
  displayedColumns = [
    "id",
    "time",
    "date",
    "course",
    "country",
    "odds",
    "position1",
    "position2",
    "position3",
    "edit",
     "delete"
  ];

  dataSource = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private inplayMasterService: InplayMasterService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.loadInplayDetails();
  }

  loadInplayDetails() {
    const paginationQueryParams = `page=${this.pageIndex}&size=${this.pageSize}`;
    this.inplayMasterService.getInplayData(paginationQueryParams).subscribe(
      data => {
        if (data.inplayDtos && data.inplayDtos.length > 0) {
          this.dataSource = data.inplayDtos;
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

  onSearchChange(event: any) {
    const searchValue = event.target.value;
    console.log(searchValue);
    if (searchValue) {
      this.inplayMasterService.searchInplayByName(searchValue).subscribe(
        data => {
          this.dataSource = data; // Display the search result
          this.totalRecords = data.length;
        },
        error => {
          console.error('Error searching horses:', error);
          this.snackbarService.show('Error during search.');
        }
      );
    } else {
      this.loadInplayDetails(); // If search input is cleared, reload all data
    }
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
      this.inplayMasterService.upload(this.selectedFile).subscribe({
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
    this.loadInplayDetails();
    console.log(event);
    
  }
  navigateToInplayMasteredit(data: any){
    this.inplayMasterService.setEditInplay(data);
      this.router.navigate(["inplayMasterEdit"]);
    }
  deleteInplay(id: number): void {
    this.inplayMasterService.deleteInplay(id).subscribe(
      () => {
        this.loadInplayDetails();
      },
      error => {
        console.error('Error deleting record:', error);
      }
    );
  }
}

