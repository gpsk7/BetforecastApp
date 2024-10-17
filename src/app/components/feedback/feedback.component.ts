import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, FeedbackService } from 'src/app/Services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  feedback : Feedback = {
    name: '',
    email: '',
    rating: ''
  };

  constructor(private feedbackService: FeedbackService) { }

  submitFeedback() {
    this.feedbackService.saveFeedback(this.feedback).subscribe(
      response => {
        console.log('Feedback submitted successfully', response);
        window.alert('Feedback submitted successfully');
      },
      error => {
        console.error('Error submitting feedback', error);
        // Optionally, you can handle errors here
      }
    );
  }
}