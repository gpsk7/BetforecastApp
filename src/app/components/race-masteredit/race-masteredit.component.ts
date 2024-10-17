import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RaceMasterService } from 'src/app/Services/race-master.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-race-masteredit',
  templateUrl: './race-masteredit.component.html',
  styleUrls: ['./race-masteredit.component.css']
})
export class RaceMastereditComponent implements OnInit{

  totalRecords = 100;
  pageSize = 50;
  pageIndex = 0;
  isEdit: boolean = false;

  pmFormControl = this.fb.group({
    id: [],
    date: [],
    course: ["", [Validators.pattern('[a-zA-Z]*$')]],
    country: ["", [Validators.pattern('[a-zA-Z]*$')]],
    raceId: ["", [Validators.pattern('^\\d+$')]],
    distance: ["", [Validators.pattern('^\\d+$')]] ,
    raceNumber: ["", [Validators.pattern('^\\d+$')]],
    time: [],
    // raceType: [],
    horseName: ["", [Validators.pattern('[a-zA-Z]*$')]],
    horseWeight: ["", [Validators.pattern('^\\d+$')]] ,
    age: ["", [Validators.pattern('^\\d+$')]] ,
    // horseColour: [],
    jockeyName: ["", [Validators.pattern('[a-zA-Z]*$')]],
    trainerName: ["", [Validators.pattern('[a-zA-Z]*$')]],
    speed: ["", [Validators.pattern('^\\d+$')]] ,
    // btnDistance: [],
    drawnStall: ["", [Validators.pattern('^\\d+$')]] ,
    horseBallot: ["", [Validators.pattern('^\\d+$')]],
    finishPos: ["", [Validators.pattern('^\\d+$')]],
    dayValue: ["", [Validators.pattern('^\\d+$')]] ,
    // horseNameCount: [],
    // jockeyNameCount: [],
    // trainerNameCount: [],
    form: ["", [Validators.pattern('^\\d+$')]],
    
  })

  dataSource: any[] = [];
  forData: any;
  data: any;
  raceMasterEdit: any;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private raceMasterService: RaceMasterService,
    private snackbarService: SnackbarService,
    private datePipe: DatePipe,
  ) { }


  ngOnInit(): void {

    this.raceMasterEdit = this.raceMasterService.getEditRaceMaster();
    console.log("name" + "  " + this.raceMasterEdit);
    if (!this.raceMasterEdit) {
      this.router.navigate(["raceMasterEdit"]);
    } else {
      this.isEdit = Object.keys(this.raceMasterEdit).length > 0;
      const dateString = this.raceMasterEdit.date; 
      const [day, month, year] = dateString.split('-');
      const dateObject = new Date(+year, +month - 1, +day);
      this.raceMasterEdit.date= dateObject;
      this.pmFormControl.patchValue(this.raceMasterEdit);
    }
  }

  addRaceMaster() {
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
    this.raceMasterService.createRaceMaster(formObj).subscribe((data) => {
      if (data) {
        console.log("Data Saved Success", data);
        this.snackbarService.show("Race Data added successfully!");
        this.router.navigate(["raceMaster"]);
      }
    });
  }

updateRaceMaster() {
  if (!this.pmFormControl.valid) {
    return;
  }
  let formObj = this.pmFormControl.getRawValue();
  console.log("formObj", formObj);
  const selectedDate = formObj.date;  
    const formattedDate = this.datePipe.transform(selectedDate, 'dd-MM-yyyy');
    formObj.date = formattedDate;
  this.raceMasterService.updateRaceMaster(formObj).subscribe((data => {
    if (data) {
      console.log("Data updated Success", data);
      this.snackbarService.show("Race Data Updated successfully!");
      this.router.navigate(["raceMaster"]);
    }
  }));
} 
}
