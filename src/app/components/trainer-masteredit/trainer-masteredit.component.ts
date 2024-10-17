import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { TrainerMasterService } from 'src/app/Services/trainer-master.service';

@Component({
  selector: 'app-trainer-masteredit',
  templateUrl: './trainer-masteredit.component.html',
  styleUrls: ['./trainer-masteredit.component.css']
})
export class TrainerMastereditComponent implements OnInit{

  totalRecords = 100;
  pageSize = 100;
  pageIndex = 0;
  isEdit: boolean = false

  pmFormControl = this.fb.group({
    id: [],
    trainerName: ["", [Validators.pattern('[a-zA-Z]*$')]],
    trainerCount:["", [Validators.pattern('^\\d+$')]] ,
    trainerRegistrationId: ["", [Validators.pattern('^\\d+$')]] ,
    trainerCountry: ["", [Validators.pattern('[a-zA-Z]*$')]],
    trainerStable: ["", [Validators.pattern('[a-zA-Z]*$')]],
    trainerAge: ["", [Validators.pattern('^\\d+$')]] ,
    trainerGender: ["", [Validators.pattern('[a-zA-Z]*$')]],
  })

  dataSource: any[] = [];
  forData: any;
  data: any;
  trainerEdit: any;
  
 
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private trainerMaster: TrainerMasterService,
    private snackbarService: SnackbarService,
  )
   {}

 
  ngOnInit(): void {
    this.trainerEdit = this.trainerMaster.getEditTrainer();
    console.log("name" + "  " + this.trainerEdit);
    if (!this.trainerEdit) {
      this.router.navigate(["trainerMasteredit"]);
    } else {
      this.isEdit = Object.keys(this.trainerEdit).length > 0;
      this.pmFormControl.patchValue(this.trainerEdit);
    }

  }
  addTrainer() {
    console.log(
      "this.pmFormControl -------------- ",
      this.pmFormControl
    );

    if (!this.pmFormControl.valid) {
      return;
    }

    let formObj = this.pmFormControl.getRawValue();
    console.log("formObj", formObj);
    this.trainerMaster.createTrainer(formObj).subscribe((data) => {
      if (data) {
        console.log("Data Saved Success", data);
        this.snackbarService.show("Trainer Data added successfully!");
        this.router.navigate(["trainerMaster"]);
      }
    });
  }

  updateTrainer() {
    if (!this.pmFormControl.valid) {
      return;
    }
    let formObj = this.pmFormControl.getRawValue();
    console.log("formObj", formObj);
    this.trainerMaster.updateTrainer(formObj).subscribe((data => {
      if (data) {
        console.log("Data updated Success", data);
        this.snackbarService.show("Trainer Data Updated successfully!");
        this.router.navigate(["trainerMaster"]);
      }
    }));
  } 
}
