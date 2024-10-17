import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AstrologyMasterService } from 'src/app/Services/astrology-master.service';
import { AstrologyService } from 'src/app/Services/astrology.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-astrology-masteredit',
  templateUrl: './astrology-masteredit.component.html',
  styleUrls: ['./astrology-masteredit.component.css']
})
export class AstrologyMastereditComponent {

  totalRecords = 100;
  pageSize = 50;
  pageIndex = 0;
  isEdit: boolean = false;

  pmFormControl = this.fb.group({
    id: [],
    time: [],
    date: [],
    dasha: ["", [Validators.pattern('[a-zA-Z]*$')]],
    antarDasha: ["", [Validators.pattern('[a-zA-Z]*$')]],
    ownHouse:["", [Validators.pattern('[a-zA-Z]*$')]],

  })

  dataSource: any[] = [];
  forData: any;
  data: any;
  astrologyEdit: any;


  constructor(
    private fb: FormBuilder,
    private astrologyMasterService: AstrologyMasterService,
    private router: Router,
    private snackbarService:SnackbarService,
    private datePipe: DatePipe,
  ) { }

  
  ngOnInit(): void {

    
    this.astrologyEdit = this.astrologyMasterService.getEditAstrology();
    console.log("name" + "  " + this.astrologyEdit);
    if (!this.astrologyEdit) {
      this.router.navigate(["astrologyMasterEdit"]);
    } else {
      this.isEdit = Object.keys(this.astrologyEdit).length > 0;
      const dateString = this.astrologyEdit.date; 
      const [day, month, year] = dateString.split('-');
      const dateObject = new Date(+year, +month - 1, +day);
      this.astrologyEdit.date= dateObject;
      this.pmFormControl.patchValue(this.astrologyEdit);
    }
  }

  addAstrologyData() {
    if (!this.pmFormControl.valid) {
      this.snackbarService.show("Please fill all required fields.");
      return;
    }
  
    let formObj = this.pmFormControl.getRawValue();
    const selectedDate = formObj.date;
    const formattedDate = this.datePipe.transform(selectedDate, 'dd-MM-yyyy');
    formObj.date = formattedDate;
  
    this.astrologyMasterService.createAstrology(formObj).subscribe(
      (data) => {
        if (data) {
          this.snackbarService.show("Astrology Data added successfully!");
          this.router.navigate(["/astrologyMaster"]);
        }
      },
      (error) => {
        console.error("Full error response:", error); // Log the full error to debug
        if (error.error && typeof error.error === 'string') {
          // If backend returns a string error message
          this.snackbarService.show(error.error); 
        } else if (error.error && error.error.message) {
          // If backend returns an error object with a 'message' field
          this.snackbarService.show(error.error.message);
        } else {
          this.snackbarService.show("An unknown error occurred.");
        }
      }
    );
  }
  
  updateAstrologyData() {
    if (!this.pmFormControl.valid) {
      this.snackbarService.show("Please fill all required fields.");
      return;
    }
  
    let formObj = this.pmFormControl.getRawValue();
    const selectedDate = formObj.date;
    const formattedDate = this.datePipe.transform(selectedDate, 'dd-MM-yyyy');
    formObj.date = formattedDate;
  
    this.astrologyMasterService.updateAstrology(formObj).subscribe(
      (data) => {
        if (data) {
          this.snackbarService.show("Astrology Data updated successfully!");
          this.router.navigate(["/astrologyMaster"]);
        }
      },
      (error) => {
        console.error("Full error response:", error); // Log the full error to debug
        if (error.error && typeof error.error === 'string') {
          this.snackbarService.show(error.error);
        } else if (error.error && error.error.message) {
          this.snackbarService.show(error.error.message);
        } else {
          this.snackbarService.show("An unknown error occurred.");
        }
      }
    );
  }
}  