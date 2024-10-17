import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { HorseMasterService } from 'src/app/Services/horse-master.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-horse-masteredit',
  templateUrl: './horse-masteredit.component.html',
  styleUrls: ['./horse-masteredit.component.css']
})
export class HorseMastereditComponent implements OnInit {

  totalRecords = 100;
  pageSize = 50;
  pageIndex = 0;
  isEdit: boolean = false;

  pmFormControl = this.fb.group({
    id: [],
    name: ["", [Validators.pattern('^[a-zA-Z]*$')]],
    breed: ["", [Validators.pattern('^[a-zA-Z]*$')]],
    gender: ["", [Validators.pattern('^[a-zA-Z]*$')]],
    color: ["", [Validators.pattern('^[a-zA-Z]*$')]],
    age: ["", [Validators.pattern('^\\d+$')]],
    height: ['', [Validators.pattern('^\\d+\\.\\d+$')]],
    weight: ['', [Validators.pattern('^\\d+\\.\\d+$')]],
    registrationNumber: ["", [Validators.pattern('^\\d+$')]],
    count: ["", [Validators.pattern('^\\d+$')]],
    country: ["", [Validators.pattern('^[a-zA-Z]*$')]],
    speed: ["", [Validators.pattern('^\\d+$')]],
    dam: ["", [Validators.pattern('^[a-zA-Z]*$')]],
    sire: ["", [Validators.pattern('^[a-zA-Z]*$')]],

  })
  dataSource: any[] = [];
  forData: any;
  data: any;
  horseEdit: any;


  constructor(
    private fb: FormBuilder,
    private horseMasterService: HorseMasterService,
    private router: Router,
    private snackbarService:SnackbarService,
  ) { }

  
  ngOnInit(): void {

    
    this.horseEdit = this.horseMasterService.getEditHorse();
    console.log("name" + "  " + this.horseEdit);
    if (!this.horseEdit) {
      this.router.navigate(["horseMasteredit"]);
    } else {
      this.isEdit = Object.keys(this.horseEdit).length > 0;
      this.pmFormControl.patchValue(this.horseEdit);
    }
  }

  addHorseData() {
    console.log(
      "this.pmFormControl -------------- ",
      this.pmFormControl
    );

    if (!this.pmFormControl.valid) {
      return;
    }

    let formObj = this.pmFormControl.getRawValue();
    console.log("formObj", formObj);
    this.horseMasterService.createHorse(formObj).subscribe((data) => {
      if (data) {
        console.log("Data Saved Success", data);
        this.snackbarService.show("Horse Data added successfully!");
        this.router.navigate(["/horseMaster"]);
      }
    });
  }

  updateHorseData() {
    if (!this.pmFormControl.valid) {
      return;
    }
    let formObj = this.pmFormControl.getRawValue();
    console.log("formObj", formObj);
    this.horseMasterService.updateHorse(formObj).subscribe((data) => {
      if (data) {
        console.log("Data updated Success", data);
        this.snackbarService.show("Horse Data Updated successfully!"); 
        this.router.navigate(["horseMaster"]);
      }
    });
  }
  
}

  
      
