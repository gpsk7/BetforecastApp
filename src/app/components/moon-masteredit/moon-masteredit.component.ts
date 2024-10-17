import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MoonMasterService } from 'src/app/Services/moon-master.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-moon-masteredit',
  templateUrl: './moon-masteredit.component.html',
  styleUrls: ['./moon-masteredit.component.css']
})
export class MoonMastereditComponent {

  totalRecords = 100;
  pageSize = 50;
  pageIndex = 0;
  isEdit: boolean = false;
  moonDayOptions: string[] = ['Amavasya', 'Poornima'];

  pmFormControl = this.fb.group({
    id: [],
    date: [], 
    moonDay: ["", [Validators.pattern('[a-zA-Z]*$')]] 
  });

  dataSource: any[] = [];
  forData: any;
  data: any;
  moonEdit: any;


  constructor(
    private fb: FormBuilder,
    private moonMasterService: MoonMasterService,
    private router: Router,
    private snackbarService:SnackbarService,
    private datePipe: DatePipe,
  ) { }

  
  ngOnInit(): void {

    
    this.moonEdit = this.moonMasterService.getEditMoon();
    console.log("name" + "  " + this.moonEdit);
    if (!this.moonEdit) {
      this.router.navigate(["moonMasterEdit"]);
    } else {
      this.isEdit = Object.keys(this.moonEdit).length > 0;
      const dateString = this.moonEdit.date; 
      const [day, month, year] = dateString.split('-');
      const dateObject = new Date(+year, +month - 1, +day);
      this.moonEdit.date= dateObject;
      this.pmFormControl.patchValue(this.moonEdit);
    }
  }

  addMoonData() {
    if (!this.pmFormControl.valid) {
      this.snackbarService.show("Please fill all required fields.");
      return;
    }
  
    let formObj = this.pmFormControl.getRawValue();
    const selectedDate = formObj.date;  
    const formattedDate = this.datePipe.transform(selectedDate, 'dd-MM-yyyy');
    formObj.date = formattedDate;
  
    this.moonMasterService.createMoon(formObj).subscribe(
      (data) => {
        if (data) {
          this.snackbarService.show("Moon Data added successfully!");
          this.router.navigate(["/moonMaster"]);
        }
      },
      (error) => {
        console.error("Full error response:", error); // Log the error response for debugging
        if (error.error && typeof error.error === 'string') {
          this.snackbarService.show(error.error); // Show the specific error message
        } else if (error.error && error.error.message) {
          this.snackbarService.show(error.error.message); // Show the error message if it's an object
        } else {
          this.snackbarService.show("An unknown error occurred.");
        }
      }
    );
  }
  
  updateMoonData() {
    if (!this.pmFormControl.valid) {
      this.snackbarService.show("Please fill all required fields.");
      return;
    }
  
    let formObj = this.pmFormControl.getRawValue();
    const selectedDate = formObj.date;  
    const formattedDate = this.datePipe.transform(selectedDate, 'dd-MM-yyyy');
    formObj.date = formattedDate;
  
    this.moonMasterService.updateMoon(formObj).subscribe(
      (data) => {
        if (data) {
          this.snackbarService.show("Moon Data updated successfully!");
          this.router.navigate(["moonMaster"]);
        }
      },
      (error) => {
        console.error("Full error response:", error); // Log the error response for debugging
        if (error.error && typeof error.error === 'string') {
          this.snackbarService.show(error.error); // Show the specific error message
        } else if (error.error && error.error.message) {
          this.snackbarService.show(error.error.message); // Show the error message if it's an object
        } else {
          this.snackbarService.show("An unknown error occurred.");
        }
      }
    );
  }
}