import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit{





  //   message: String= '';
  // received(event: String) {
  // this.message=event;
  // }




  smsMessage: string = 'Hello! This is your SMS message from Parent Component.';
  tittle = "gouse";
  isDisabled = true;
  message: String = '';
  name: any;
  showMessage: boolean = true;
  items: String[] = ["Apple", "banana", "Mango"];
  selectedColor: String = "";
  toggleMessage() {
    this.showMessage = !this.showMessage;
  }
  click() {
    this.message = "Hello Angular";
  }

  changeColor(color: String) {
    this.selectedColor = color;
  }
  userForm!: FormGroup; // Define the form group
  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    console.log('Form Submitted!', this.userForm.value);
    this.submitted = true; // Set submitted flag
  }
}


