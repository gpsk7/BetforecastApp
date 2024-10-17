import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InplayMasterService } from 'src/app/Services/inplay-master.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-inplay-masteredit',
  templateUrl: './inplay-masteredit.component.html',
  styleUrls: ['./inplay-masteredit.component.css']
})
export class InplayMastereditComponent {

  totalRecords = 100;
  pageSize = 50;
  pageIndex = 0;
  isEdit: boolean = false;

  pmFormControl = this.fb.group({
    id: [],
    time: [],
    date: [],
    course: [],
    country: [],
    odds: [],
    position1: ["", [Validators.pattern('^\\d+$')]] ,
    position2: ["", [Validators.pattern('^\\d+$')]] ,
    position3: ["", [Validators.pattern('^\\d+$')]] ,
  
  })

  dataSource: any[] = [];
  forData: any;
  data: any;
  inplayEdit: any;


  constructor(
    private fb: FormBuilder,
    private inplayMasterService: InplayMasterService,
    private router: Router,
    private snackbarService:SnackbarService,
    private datePipe: DatePipe,
  ) { }

  
  ngOnInit(): void {

    this.inplayEdit = this.inplayMasterService.getEditInplay();
    console.log("name" + "  " + this.inplayEdit);
    if (!this.inplayEdit) {
      this.router.navigate(["inplayMasterEdit"]);
    } else {
      this.isEdit = Object.keys(this.inplayEdit).length > 0;
      const dateString = this.inplayEdit.date; 
      const [day, month, year] = dateString.split('-');
      const dateObject = new Date(+year, +month - 1, +day);
      this.inplayEdit.date= dateObject;
      this.pmFormControl.patchValue(this.inplayEdit);
    }
  }

  addInpalyData() {
    console.log(
      "this.pmFormControl -------------- ",
      this.pmFormControl
    );

    if (!this.pmFormControl.valid) {
      return;
    }

    let formObj = this.pmFormControl.getRawValue();
    console.log("formObj", formObj);
    const selectedDate = formObj.date;  
    const formattedDate = this.datePipe.transform(selectedDate, 'dd-MM-yyyy');
    formObj.date = formattedDate;
    this.inplayMasterService.create(formObj).subscribe((data) => {
      if (data) {
        console.log("Data Saved Success", data);
        this.snackbarService.show("Inplay Data added successfully!");
        this.router.navigate(["/inplayMaster"]);
      }
    });
  }

  updateInplayData() {
    if (!this.pmFormControl.valid) {
      return;
    }
    let formObj = this.pmFormControl.getRawValue();
    console.log("formObj", formObj);
    const selectedDate = formObj.date;  
    const formattedDate = this.datePipe.transform(selectedDate, 'dd-MM-yyyy');
    formObj.date = formattedDate;
    this.inplayMasterService.update(formObj).subscribe((data) => {
      if (data) {
        console.log("Data updated Success", data);
        this.snackbarService.show("Inplay Data Updated successfully!"); 
        this.router.navigate(["inplayMaster"]);
      }
    });
  }
  
}

