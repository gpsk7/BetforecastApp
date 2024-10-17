import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent {

@Output() meassageEvent = new EventEmitter<String>();

 

send() {
  this.meassageEvent.emit("Hii Parent i am your child");
}





  // @Input() sms: string = '';

}
