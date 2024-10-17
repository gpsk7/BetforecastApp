import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NatureoftheDayService } from 'src/app/Services/natureofthe-day.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-nature-of-the-day-masteredit',
  templateUrl: './nature-of-the-day-masteredit.component.html',
  styleUrls: ['./nature-of-the-day-masteredit.component.css']
})
export class NatureOfTheDayMastereditComponent {

  totalRecords = 100;
  pageSize = 50;
  pageIndex = 0;
  isEdit: boolean = false;

  pmFormControl = this.fb.group({
    id: [],
    date: [],
    dayValue: ["", [Validators.pattern('^\\d+$')]],
    nakshatra: ["", [Validators.pattern('^[a-zA-Z]*$')]],
    natureOfDay: ["", [Validators.pattern('^[a-zA-Z]*$')]],
    nakshatraNumber: ["", [Validators.pattern('^\\d+$')]],
    natureOfDayNo: ["", [Validators.pattern('^\\d+$')]],
    nruler: ["", [Validators.pattern('^[a-zA-Z]*$')]],
    rcolour: ["", [Validators.pattern('^[a-zA-Z]*$')]],
    rcolourNo: ["", [Validators.pattern('^\\d+$')]],
    nrulerNumber: ["", [Validators.pattern('^\\d+$')]]
    

  })
  dataSource: any[] = [];
  forData: any;
  data: any;
  natureEdit: any;


  constructor(
    private fb: FormBuilder,
    private natureoftheDay: NatureoftheDayService,
    private router: Router,
    private snackbarService: SnackbarService,
    private datePipe: DatePipe,
  ) { }


  ngOnInit(): void {
    this.natureEdit = this.natureoftheDay.getEditNature();
    console.log("name" + "  " + this.natureEdit);
    if (!this.natureEdit) {
      this.router.navigate(["natureofthedayEdit"]);
    } else {
      this.isEdit = Object.keys(this.natureEdit).length > 0;
      const dateString = this.natureEdit.date; 
      const [day, month, year] = dateString.split('-');
      const dateObject = new Date(+year, +month - 1, +day);
      this.natureEdit.date= dateObject;
      this.pmFormControl.patchValue(this.natureEdit);
    }


  }

  addNatureData() {
    if (!this.pmFormControl.valid) {
      this.snackbarService.show("Please fill all required fields.");
      return;
    }
  
    let formObj = this.pmFormControl.getRawValue();
    const selectedDate = formObj.date;  
    const formattedDate = this.datePipe.transform(selectedDate, 'dd-MM-yyyy');
    formObj.date = formattedDate;
  
    this.natureoftheDay.createNature(formObj).subscribe(
      (data) => {
        if (data) {
          console.log("Data Saved Success", data);
          this.snackbarService.show("Nature Data added successfully!");
          this.router.navigate(["/natureoftheday"]);
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
  
  updateNatureData() {
    if (!this.pmFormControl.valid) {
      this.snackbarService.show("Please fill all required fields.");
      return;
    }
  
    let formObj = this.pmFormControl.getRawValue();
    const selectedDate = formObj.date;  
    const formattedDate = this.datePipe.transform(selectedDate, 'dd-MM-yyyy');
    formObj.date = formattedDate;
  
    this.natureoftheDay.updateNature(formObj).subscribe(
      (data) => {
        if (data) {
          console.log("Data updated Success", data);
          this.snackbarService.show("Nature Data Updated successfully!");
          this.router.navigate(["/natureoftheday"]);
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

