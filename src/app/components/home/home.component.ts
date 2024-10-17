import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { RaceService } from 'src/app/Services/race.service';
import { PublicRaceService } from 'src/app/Services/public-race.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { FormBuilder } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

//   displayedColumns = [
//     'raceId',
//     'speed',
//     'dayValue',
//     'finishPos',
//     'horseName',
//     'jockeyName',
//     'trainerName',
//     'horseBallot',
//     'horseNameCount',
//     'jockeyNameCount',
//     'trainerNameCount',
//   ];
//   date: Date = new Date();
//   country: string = '';
//   course: string = '';
//   selectedRaceNumberAndTime: string = '';

//   selectedCountry: string | undefined;
//   selectedCourse: string | undefined;
//   selectedRace: { raceNumber: string, time: string } | undefined;

//   countries: string[] = [];
//   courses: string[] = [];
//   raceNumbersAndTimes: { raceNumber: string, time: string }[] = [];
//   raceDetails: any[] = [];
//   readonly startDate = new Date(1990, 0, 1);
//   isModalOpen = false;
//   selectedRaceDetails: any = null; 


//   constructor(private publicRaceService: PublicRaceService, private router: Router,
//     private translate: TranslateService
//   ) {
//     translate.setDefaultLang('en');
//     translate.use('en');
//   }
//   getTranslation(key: string): Observable<string> {
//     return this.translate.get(key);
//   }

//   ngOnInit(): void {
//     this.date = new Date();
//     this.getCountries();
//   }

//   selectCountry(country: string): void {
//     this.selectedCountry = country;
//     this.country = country;
//     this.getCourses();
//   }

//   selectCourse(course: string): void {
//     this.selectedCourse = course;
//     this.course = course;
//     this.getRaceNumbersAndTimes();
//   }

//   selectRace(race: { raceNumber: string, time: string }): void {
//     this.selectedRace = race;
//     this.selectedRaceNumberAndTime = race.raceNumber;
//     this.getRaceDetails();
//   }

//   getCountries(): void {
//     const formattedDate = this.formatDate(this.date);
//     if (formattedDate) {
//       this.publicRaceService.getCountriesByDate(formattedDate).subscribe(data => {
//         this.countries = data;
//         this.courses = [];
//         this.raceNumbersAndTimes = [];
//         this.raceDetails = [];
//       }, error => {
//         console.error('Error fetching countries:', error);
//       });
//     }
//   }

//   getCourses(): void {
//     const formattedDate = this.formatDate(this.date);
//     if (this.country && formattedDate) {
//       this.publicRaceService.getCoursesByCountryAndDate(this.country, formattedDate).subscribe(data => {
//         this.courses = data;
//         this.raceNumbersAndTimes = [];
//         this.raceDetails = [];
//       }, error => {
//         console.error('Error fetching courses:', error);
//       });
//     }
//   }

//   getRaceNumbersAndTimes(): void {
//     const formattedDate = this.formatDate(this.date);
//     if (this.country && formattedDate && this.course) {
//       this.publicRaceService.getRaceNumbersAndTimes(this.country, formattedDate, this.course).subscribe(data => {
//         this.raceNumbersAndTimes = data;
//         this.raceDetails = [];
//       }, error => {
//         console.error('Error fetching race numbers and times:', error);
//       });
//     }
//   }

//   getRaceDetails(): void {
//     const formattedDate = this.formatDate(this.date);
//     if (this.country && formattedDate && this.course && this.selectedRaceNumberAndTime) {
//       const raceNumber = this.selectedRaceNumberAndTime;
//       this.publicRaceService.getDetailsByCountryAndDateAndCourseAndRaceId(this.country, formattedDate, this.course, raceNumber).subscribe(data => {
//         this.raceDetails = data.map(race => ({
//           ...race,
//           horseNameCount: this.calculateNameCount(race.horseName),
//           jockeyNameCount: this.calculateNameCount(race.jockeyName),
//           trainerNameCount: this.calculateNameCount(race.trainerName)
//         }));
//         console.log('Race details:', this.raceDetails);
//       }, error => {
//         console.error('Error fetching race details:', error);
//       });
//     }
//   }

//   formatDate(date: Date): string {
//     return moment(date).format('DD-MM-YYYY');
//   }

//   calculateNameCount(name: string): number {
//     const lowercaseName = name.toLowerCase();
//     let sum = 0;
//     for (let i = 0; i < lowercaseName.length; i++) {
//       const charCode = lowercaseName.charCodeAt(i);
//       if (charCode >= 97 && charCode <= 122) {
//         sum += charCode - 96;
//       }
//     }
//     return this.reduceToSingleDigit(sum);
//   }

//   reduceToSingleDigit(number: number): number {
//     while (number >= 10) {
//       number = number.toString().split('').map(Number).reduce((a, b) => a + b, 0);
//     }
//     return number;
//   }

//   onColumnDrop(event: CdkDragDrop<string[]>): void {
//     const previousIndex = event.previousIndex;
//     const currentIndex = event.currentIndex;


//     if (previousIndex !== currentIndex) {
//       moveItemInArray(this.displayedColumns, previousIndex, currentIndex);
//     }
//   }

//   exportToPDF() {
//     const data = document.getElementById('race-details-table');
//     const selectedDate = this.date ? this.date.toLocaleDateString() : '';
//     const selectedCountry = this.selectedCountry ? `<p><strong>Selected Country:</strong> ${this.selectedCountry}</p>` : '';
//     const selectedCourse = this.selectedCourse ? `<p><strong>Selected Course:</strong> ${this.selectedCourse}</p>` : '';
//     const selectedRace = this.selectedRace ? `<p><strong>Selected Race Number:</strong> RACE ${this.selectedRace.raceNumber} <strong>Time:</strong> ${this.selectedRace.time}</p>` : '';

//     const doc = new jsPDF('p', 'mm', 'a4');
//     doc.setFontSize(12);
//     doc.text('Race Details', 10, 10);
//     doc.text(`Selected Date: ${selectedDate}`, 10, 20);
//     if (this.selectedCountry) {
//       doc.text(`Selected Country: ${this.selectedCountry}`, 10, 30);
//     }
//     if (this.selectedCourse) {
//       doc.text(`Selected Course: ${this.selectedCourse}`, 10, 40);
//     }
//     if (this.selectedRace) {
//       doc.text(`Selected Race Number: RACE ${this.selectedRace.raceNumber} Time: ${this.selectedRace.time}`, 10, 50);
//     }

//     if (data) {
//       html2canvas(data).then(canvas => {
//         const imgData = canvas.toDataURL('image/png');
//         doc.addImage(imgData, 'PNG', 10, 60, 190, 0);
//         doc.save('race-details.pdf');
//       });
//     }
//   }

//   printRaceDetails() {
//     const printContents = document.getElementById('race-details-table')?.innerHTML;
//     const selectedDate = this.date ? this.date.toLocaleDateString() : '';
//     const selectedCountry = this.selectedCountry ? `<p><strong>Selected Country:</strong> ${this.selectedCountry}</p>` : '';
//     const selectedCourse = this.selectedCourse ? `<p><strong>Selected Course:</strong> ${this.selectedCourse}</p>` : '';
//     const selectedRace = this.selectedRace ? `<p><strong>Selected Race Number:</strong> RACE ${this.selectedRace.raceNumber} <strong>Time:</strong> ${this.selectedRace.time}</p>` : '';

//     if (printContents) {
//       const originalContents = document.body.innerHTML;
//       document.body.innerHTML = `<html><head><title>Race Details</title></head><body>
//                                  <p><strong>Selected Date:</strong> ${selectedDate}</p>
//                                  ${selectedCountry}
//                                  ${selectedCourse}
//                                  ${selectedRace}
//                                  ${printContents}</body></html>`;
//       window.print();
//       document.body.innerHTML = originalContents;
//     }
//   }

//   navigateToRaceDetails() {
//     this.router.navigate(['/details'], { state: { data: this.raceDetails } });
//   }
//   getChunkedRaceDetails() {
//     const chunkSize = 3;
//     const result = [];
  
//     for (let i = 0; i < this.raceDetails.length; i += chunkSize) {
//       result.push(this.raceDetails.slice(i, i + chunkSize));
//     }
  
//     return result;
//   }
  
//    openMoreInfo(race: any) {
//     this.selectedRaceDetails = race;  
//     this.isModalOpen = true;  
//    }

//     closeModal() {
//     this.isModalOpen = false;
//    }
// }  

todayDate = new Date();
currentDate = new Date();
displayedDates: Date[] = [];
selectedDate!: Date;
countries: string[] = [];
isDateSelected = false;
expandedCountry: string | null = null; // Track the expanded country
countryCourses: string[] = []; 
country!: string ;
course!: string ;
date: Date | null = null;
raceNumbersAndTimes: any[] = [];
raceDetails: any[] = [];

constructor(private raceService: RaceService,
  private router: Router,
  private activatedRoute: ActivatedRoute,
  private snackbarService: SnackbarService,
  private fb: FormBuilder) { }

//   ngOnInit(): void {
//     // Check if there's any navigation state with selectedDate
//     const navigation = this.router.getCurrentNavigation();
//     const state = navigation?.extras.state as { selectedDate: string };

//     if (state && state.selectedDate) {
//         // If selectedDate is available, use it
//         this.selectedDate = moment(state.selectedDate, 'DD-MM-YYYY').toDate();
//     } else {
//         // Otherwise, use today's date
//         this.selectedDate = this.currentDate; // You can comment this line out if you want to avoid using today
//         console.log("else", this.currentDate)
//     }

//     this.updateDisplayedDates(this.selectedDate);
//     this.getCountries(); // Fetch countries based on selectedDate
// }

ngOnInit(): void {
  // Check if there's any navigation state with selectedDate
  const navigation = this.router.getCurrentNavigation();
  const state = navigation?.extras.state as { selectedDate: string };

  // Use activatedRoute to get query parameters
  this.activatedRoute.queryParams.subscribe(params => {
    if (params['date']) {
      this.selectedDate = moment(params['date'], 'DD-MM-YYYY').toDate();
    } else if (state && state.selectedDate) {
      // If state selectedDate is available, use it
      this.selectedDate = moment(state.selectedDate, 'DD-MM-YYYY').toDate();
    } else {
      // Otherwise, use today's date
      this.selectedDate = this.currentDate;
    }

    // Fetch the data based on the selected date
    this.updateDisplayedDates(this.selectedDate);
    this.getCountries(); // Fetch countries based on selectedDate
  });
}
 


getCountries(): void {
  if (this.selectedDate) {
    const formattedDate = this.formatDate(this.selectedDate);
    this.raceService.getCountriesByDate(formattedDate).subscribe(
      (data) => {
        console.log(data); // Log the successful response
        this.countries = data;
        // Check if no countries were found
        if (this.countries.length === 0) {
          this.isDateSelected = false;
          this.snackbarService.showError('No countries found for the selected date.');
        } else {
          this.isDateSelected = true; // Countries found
        }
      },
      (error) => {
        console.error('Error fetching countries:', error); // Log the full error object
        let errorMessage: string;
        // Check if the error response has a message
        if (error.error && error.error.message) {
          errorMessage = error.error.message; // Access the message from the backend error response
        } else if (error.message) {
          errorMessage = error.message; // Fallback to the error.message from the error object
        } else {
          errorMessage = 'An error occurred. Please try again later.'; // General fallback
        }
        this.snackbarService.showError(errorMessage); // Show the specific error message in the snackbar
        this.isDateSelected = false; // Indicate that no date is selected
      }
    );
  }
}
toggleCourses(country: string): void {
  if (this.expandedCountry === country) {
    this.expandedCountry = null;
    this.countryCourses = []; 
  } else {
 
    this.expandedCountry = country;
    this.fetchCoursesForCountry(country); 
  }
}

fetchCoursesForCountry(country: string): void {
  const formattedDate = this.formatDate(this.selectedDate);
  this.raceService.getCoursesByCountryAndDate(country, formattedDate).subscribe(
    (data) => {
      this.countryCourses = data; // Store the fetched courses
    },
    (error) => {
      console.error('Error fetching courses:', error);
      this.snackbarService.showError('Error fetching courses data.');
      this.countryCourses = []; // Clear courses on error
    }
  );
}

formatDate(date: Date): string {
  return moment(date).format('DD-MM-YYYY');
}

updateDisplayedDates(date: Date): void {
  const startOfWeek = this.getStartOfWeek(date);
  this.displayedDates = Array.from({ length: 12 }, (_, index) => {
    const newDate = new Date(startOfWeek);
    newDate.setDate(newDate.getDate() + index);
    return newDate;
  });
}

getStartOfWeek(date: Date): Date {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay() + 1);
  return start;
}

selectDate(date: Date): void {
  this.selectedDate = date;
  console.log("sleected", this.selectedDate);
  this.getCountries(); 
}

onDateChange(event: MatDatepickerInputEvent<Date>): void {
  this.selectedDate = event.value!;
  console.log("sleected", this.selectedDate);
  this.updateDisplayedDates(this.selectedDate); 
  this.getCountries();
}

onCountryChange(selectedCountry: string): void {
  console.log('Selected Country:', selectedCountry);
}

goToToday(): void {
  this.currentDate = new Date();
  this.selectedDate = this.currentDate;
  this.updateDisplayedDates(this.currentDate);
  this.getCountries();
}

isToday(date: Date): boolean {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}

isSelected(date: Date): boolean {
  return this.selectedDate && date.getTime() === this.selectedDate.getTime();
}

goToNextWeek(): void {
  const nextWeek = new Date(this.currentDate);
  nextWeek.setDate(this.currentDate.getDate() + 12);
  this.currentDate = nextWeek;
  this.updateDisplayedDates(this.currentDate);
}

goToPreviousWeek(): void {
  const previousWeek = new Date(this.currentDate);
  previousWeek.setDate(this.currentDate.getDate() - 12);
  this.currentDate = previousWeek;
  this.updateDisplayedDates(this.currentDate);
}
showRaceDetails(country: string, course: string): void {
  this.country = country;
  this.course = course;
  const formattedDate = this.formatDate(this.selectedDate);

  this.raceService.getRaceNumbersAndTimes(country, formattedDate, course).subscribe(
    data => {
      this.raceNumbersAndTimes = data;

      this.router.navigate(['/result'], {
        queryParams: { country, date: formattedDate, course }
      });
    },
    error => {
      console.error('Error fetching race numbers and times:', error);
    }
  );
}
}
