import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JockeyMasterService } from 'src/app/Services/jockey-master.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-jockey-masteredit',
  templateUrl: './jockey-masteredit.component.html',
  styleUrls: ['./jockey-masteredit.component.css']
})
export class JockeyMastereditComponent implements OnInit {

  totalRecords = 100;
  pageSize = 50;
  pageIndex = 0;
  isEdit: boolean = false;

  pmFormControl = this.fb.group({
    id: [],
    jockeyRegistrationId: ["", [Validators.pattern('^\\d+$')]] ,
    jockeyFirstName: ["", [Validators.pattern('^[a-zA-Z]*$')]],
    jockeyLastName: ["", [Validators.pattern('^[a-zA-Z]*$')]],
    jockeyAge: ["", [Validators.pattern('^\\d+$')]] ,
    jockeyGender: ["", [Validators.pattern('^[a-zA-Z]*$')]],
    jockeyCount: ["", [Validators.pattern('^\\d+$')]] ,
    jockeyCountry: ["", [Validators.pattern('^[a-zA-Z]*$')]],
    jockeyExperienceYears: ["", [Validators.pattern('^\\d+$')]] ,
    jockeyWins: ["", [Validators.pattern('^\\d+$')]] ,
    jockeyLosses: ["", [Validators.pattern('^\\d+$')]] ,
  })

  dataSource: any[] = [];
  forData: any;
  data: any;
  jockeyEdit: any;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private jockeyMaster: JockeyMasterService,
    private snackbarService:SnackbarService,
  ) { }


  ngOnInit(): void {

    this.jockeyEdit = this.jockeyMaster.getEditJockey();
    console.log("name" + "  " + this.jockeyEdit);
    if (!this.jockeyEdit) {
      this.router.navigate(["jockeyMasteredit"]);
    } else {
      this.isEdit = Object.keys(this.jockeyEdit).length > 0;
      this.pmFormControl.patchValue(this.jockeyEdit);
    }
  }
  
  addJockey() {
    console.log(
      "this.pmFormControl -------------- ",
      this.pmFormControl
    );

    if (!this.pmFormControl.valid) {
      return;
    }

    let formObj = this.pmFormControl.getRawValue();
    console.log("formObj", formObj);
    this.jockeyMaster.createJockey(formObj).subscribe((data) => {
      if (data) {
        console.log("Data Saved Success", data);
        this.snackbarService.show("Jockey Data added successfully!");
        this.router.navigate(["/jockeyMaster"]);
      }
    });
  }
  
updateJockey() {
  if (!this.pmFormControl.valid) {
    return;
  }
  let formObj = this.pmFormControl.getRawValue();
  console.log("formObj", formObj);
  this.jockeyMaster.updateJockey(formObj).subscribe((data => {
    if (data) {
      console.log("Data updated Success", data);
      this.snackbarService.show("Jockey Data Updated successfully!");
      this.router.navigate(["jockeyMaster"]);
    }
  }));
} 
}