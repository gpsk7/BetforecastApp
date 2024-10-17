import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { NumerologyService } from 'src/app/Services/numerology.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-numerology',
  templateUrl: './numerology.component.html',
  styleUrls: ['./numerology.component.css']
})
export class NumerologyComponent implements OnInit {

  displayedColumns = [
    'raceId',
    'speed',
    'dayValue',
    'finishPos',
    'horseName',
    'jockeyName',
    'trainerName',
    'horseBallot',
    'horseNameCount',
    'jockeyNameCount',
    'trainerNameCount',
    'drawnStall',
    'predictionColor'
  ];

  date: Date = new Date();
  country: string = '';
  course: string = '';
  selectedRaceNumberAndTime: string = '';

  selectedCountry: string | undefined;
  selectedCourse: string | undefined;
  selectedRace: { raceNumber: string, time: string } | undefined;

  countries: string[] = [];
  values: any = {
    natureOfDay : '',
    dayValue: ''
  }
  courses: string[] = [];
  raceNumbersAndTimes: { raceNumber: string, time: string }[] = [];
  raceDetails: any[] = [];
  readonly startDate = new Date(1990, 0, 1);
  isModalOpen = false;
  selectedRaceDetails: any = null; 

  exportToPDFInProgress = false;
  printInProgress = false;

  constructor( private router: Router, private numerologyService: NumerologyService,
    private translate: TranslateService, private snackbarService: SnackbarService

  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
  getTranslation(key: string): Observable<string> {
    return this.translate.get(key);
  }

  ngOnInit(): void {
    this.date = new Date();
    this.getCountries();
  }

  selectCountry(country: string): void {
    this.selectedCountry = country;
    this.country = country;
    this.getCourses();
  }

  selectCourse(course: string): void {
    this.selectedCourse = course;
    this.course = course;
    this.getRaceNumbersAndTimes();
  }

  selectRace(race: { raceNumber: string, time: string }): void {
    this.selectedRace = race;
    this.selectedRaceNumberAndTime = race.raceNumber;
    this.getRaceDetails();
  }

  getCountries(): void {
    const formattedDate = this.formatDate(this.date);
    if (formattedDate) {
      this.numerologyService.getCountriesByDate(formattedDate).subscribe(data => {
        this.countries = data;
        this.courses = [];
        this.raceNumbersAndTimes = [];
        this.raceDetails = [];
      }, error => {
        console.error('Error fetching countries:', error);
        const errorMessage = error.error?.message || 'User Subscription Not Found. Please Make The Payment';
        this.snackbarService.show(errorMessage);
        this.router.navigate(["/payment"]);
      });
    }
  }
  getValues(): void {
    const formattedDate = this.formatDate(this.date);
    if(formattedDate){
      this.numerologyService.getNatureDayValue(formattedDate).subscribe(data=> {
        //  this.values.push(data);
        this.values=data;

        console.log("hiiii", this.values)
      },error => {
        console.error('Error fetching dayvalue:', error);
      });
    }
  
  }

  getCourses(): void {
    const formattedDate = this.formatDate(this.date);
    if (this.country && formattedDate) {
      this.numerologyService.getCoursesByCountryAndDate(this.country, formattedDate).subscribe(data => {
        this.courses = data;
        this.raceNumbersAndTimes = [];
        this.raceDetails = [];
      }, error => {
        console.error('Error fetching courses:', error);
      });
    }
  }

  getRaceNumbersAndTimes(): void {
    const formattedDate = this.formatDate(this.date);
    if (this.country && formattedDate && this.course) {
      this.numerologyService.getRaceNumbersAndTimes(this.country, formattedDate, this.course).subscribe(data => {
        this.raceNumbersAndTimes = data;
        this.raceDetails = [];
      }, error => {
        console.error('Error fetching race numbers and times:', error);
      });
    }
  }

  getRaceDetails(): void {
    const formattedDate = this.formatDate(this.date);
    if (this.country && formattedDate && this.course && this.selectedRaceNumberAndTime) {
      const raceNumber = this.selectedRaceNumberAndTime;
      this.numerologyService.getDetailsByCountryAndDateAndCourseAndRaceId(this.country, formattedDate, this.course, raceNumber).subscribe(data => {
        this.raceDetails = data.map(race => ({
          ...race,
          horseNameCount: this.calculateNameCount(race.horseName),
          jockeyNameCount: this.calculateNameCount(race.jockeyName),
          trainerNameCount: this.calculateNameCount(race.trainerName)
        }));
        console.log('Race details:', this.raceDetails);
      }, error => {
        this.snackbarService.show(error);  // This should display the error message
        console.error('Error fetching race details:', error);
      });
    }
  }
  
  formatDate(date: Date): string {
    return moment(date).format('DD-MM-YYYY');
  }

  calculateNameCount(name: string): number {
    const lowercaseName = name.toLowerCase();
    let sum = 0;
    for (let i = 0; i < lowercaseName.length; i++) {
      const charCode = lowercaseName.charCodeAt(i);
      if (charCode >= 97 && charCode <= 122) {
        sum += charCode - 96;
      }
    }
    return this.reduceToSingleDigit(sum);
  }

  reduceToSingleDigit(number: number): number {
    while (number >= 10) {
      number = number.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }
    return number;
  }

  onColumnDrop(event: CdkDragDrop<string[]>): void {
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;


    if (previousIndex !== currentIndex) {
      moveItemInArray(this.displayedColumns, previousIndex, currentIndex);
    }
  }

  // exportToPDF() {
  //   const data = document.getElementById('race-details-table');
  //   const selectedDate = this.date ? this.date.toLocaleDateString() : '';
  //   const selectedCountry = this.selectedCountry ? `<p><strong>Selected Country:</strong> ${this.selectedCountry}</p>` : '';
  //   const selectedCourse = this.selectedCourse ? `<p><strong>Selected Course:</strong> ${this.selectedCourse}</p>` : '';
  //   const selectedRace = this.selectedRace ? `<p><strong>Selected Race Number:</strong> RACE ${this.selectedRace.raceNumber} <strong>Time:</strong> ${this.selectedRace.time}</p>` : '';

  //   const doc = new jsPDF('p', 'mm', 'a4');
  //   doc.setFontSize(12);
  //   doc.text('Race Details', 10, 10);
  //   doc.text(`Selected Date: ${selectedDate}`, 10, 20);
  //   if (this.selectedCountry) {
  //     doc.text(`Selected Country: ${this.selectedCountry}`, 10, 30);
  //   }
  //   if (this.selectedCourse) {
  //     doc.text(`Selected Course: ${this.selectedCourse}`, 10, 40);
  //   }
  //   if (this.selectedRace) {
  //     doc.text(`Selected Race Number: RACE ${this.selectedRace.raceNumber} Time: ${this.selectedRace.time}`, 10, 50);
  //   }

  //   if (data) {
  //     html2canvas(data).then(canvas => {
  //       const imgData = canvas.toDataURL('image/png');
  //       doc.addImage(imgData, 'PNG', 10, 60, 190, 0);
  //       doc.save('race-details.pdf');
  //     });
  //   }
  // }

  // printRaceDetails() {
  //   const printContents = document.getElementById('race-details-table')?.innerHTML;
  //   const selectedDate = this.date ? this.date.toLocaleDateString() : '';
  //   const selectedCountry = this.selectedCountry ? `<p><strong>Selected Country:</strong> ${this.selectedCountry}</p>` : '';
  //   const selectedCourse = this.selectedCourse ? `<p><strong>Selected Course:</strong> ${this.selectedCourse}</p>` : '';
  //   const selectedRace = this.selectedRace ? `<p><strong>Selected Race Number:</strong> RACE ${this.selectedRace.raceNumber} <strong>Time:</strong> ${this.selectedRace.time}</p>` : '';

  //   if (printContents) {
  //     const originalContents = document.body.innerHTML;
  //     document.body.innerHTML = `<html><head><title>Race Details</title></head><body>
  //                                <p><strong>Selected Date:</strong> ${selectedDate}</p>
  //                                ${selectedCountry}
  //                                ${selectedCourse}
  //                                ${selectedRace}
  //                                ${printContents}</body></html>`;
  //     window.print();
  //     document.body.innerHTML = originalContents;
  //   }
  // }

  handleExportToPDF(): void {
    if (!this.exportToPDFInProgress && !this.printInProgress) {
      this.exportToPDFInProgress = true;
      this.disableButtons(); // Disable all buttons during the operation
      this.exportToPDF();
    }
  }
  
  handlePrintRaceDetails(): void {
    if (!this.exportToPDFInProgress && !this.printInProgress) {
      this.printInProgress = true;
      this.disableButtons(); // Disable all buttons during the operation
      this.printRaceDetails();
    }
  }
  
  exportToPDF(): void {
    const data = document.getElementById('race-details-table');
    const selectedDate = this.date ? this.date.toLocaleDateString() : '';
    const selectedCountry = this.selectedCountry ? `<p><strong>Selected Country:</strong> ${this.selectedCountry}</p>` : '';
    const selectedCourse = this.selectedCourse ? `<p><strong>Selected Course:</strong> ${this.selectedCourse}</p>` : '';
    const selectedRace = this.selectedRace ? `<p><strong>Selected Race Number:</strong> RACE ${this.selectedRace.raceNumber} <strong>Time:</strong> ${this.selectedRace.time}</p>` : '';
  
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.setFontSize(12);
    doc.text('Race Details', 10, 10);
    doc.text(`Selected Date: ${selectedDate}`, 10, 20);
    if (this.selectedCountry) {
      doc.text(`Selected Country: ${this.selectedCountry}`, 10, 30);
    }
    if (this.selectedCourse) {
      doc.text(`Selected Course: ${this.selectedCourse}`, 10, 40);
    }
    if (this.selectedRace) {
      doc.text(`Selected Race Number: RACE ${this.selectedRace.raceNumber} Time: ${this.selectedRace.time}`, 10, 50);
    }
  
    if (data) {
      html2canvas(data).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 10, 60, 190, 0);
        doc.save('race-details.pdf');
        this.exportToPDFInProgress = false; // Reset state after PDF export
        this.enableButtons(); // Re-enable all buttons
      }).catch(() => {
        console.error('Error generating PDF');
        this.exportToPDFInProgress = false; // Reset in case of error
        this.enableButtons(); // Re-enable all buttons after error
      });
    }
  }
  
  printRaceDetails(): void {
    const printContents = document.getElementById('race-details-table')?.innerHTML;
    const selectedDate = this.date ? this.date.toLocaleDateString() : '';
    const selectedCountry = this.selectedCountry ? `<p><strong>Selected Country:</strong> ${this.selectedCountry}</p>` : '';
    const selectedCourse = this.selectedCourse ? `<p><strong>Selected Course:</strong> ${this.selectedCourse}</p>` : '';
    const selectedRace = this.selectedRace ? `<p><strong>Selected Race Number:</strong> RACE ${this.selectedRace.raceNumber} <strong>Time:</strong> ${this.selectedRace.time}</p>` : '';
  
    if (printContents) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = `<html><head><title>Race Details</title></head><body>
                                 <p><strong>Selected Date:</strong> ${selectedDate}</p>
                                 ${selectedCountry}
                                 ${selectedCourse}
                                 ${selectedRace}
                                 ${printContents}</body></html>`;
      window.print();
  
      // Use a timeout to re-enable buttons after print dialog closes
      setTimeout(() => {
        document.body.innerHTML = originalContents;
        this.printInProgress = false; // Reset state after printing
        this.enableButtons(); // Re-enable all buttons after print (even if canceled)
      }, 100);
    } else {
      this.printInProgress = false; // Reset state in case of error
      this.enableButtons(); // Re-enable all buttons after error
    }
  }
  
  // Disable all relevant buttons during export/print
  disableButtons(): void {
    const exportButton = document.querySelector('.export-pdf-button') as HTMLButtonElement;
    const printButton = document.querySelector('.print-button') as HTMLButtonElement;
    const moreInfoButton = document.querySelector('.more-info-button') as HTMLButtonElement;
  
    if (exportButton && printButton && moreInfoButton) {
      exportButton.disabled = true;
      printButton.disabled = true;
      moreInfoButton.disabled = true;
    }
  }
  
  // Enable all buttons after export/print is done
  enableButtons(): void {
    const exportButton = document.querySelector('.export-pdf-button') as HTMLButtonElement;
    const printButton = document.querySelector('.print-button') as HTMLButtonElement;
    const moreInfoButton = document.querySelector('.more-info-button') as HTMLButtonElement;
  
    if (exportButton && printButton && moreInfoButton) {
      exportButton.disabled = false;
      printButton.disabled = false;
      moreInfoButton.disabled = false;
    }
  }

  navigateToRaceDetails() {
    this.router.navigate(['/details'], { state: { data: this.raceDetails } });
  }
  getChunkedRaceDetails() {
    const chunkSize = 3;
    const result = [];
  
    for (let i = 0; i < this.raceDetails.length; i += chunkSize) {
      result.push(this.raceDetails.slice(i, i + chunkSize));
    }
  
    return result;
  }
  
   openMoreInfo(race: any) {
    this.selectedRaceDetails = race;  // Store selected race details
    this.isModalOpen = true;  // Open the modal
   }

   // Close modal
    closeModal() {
    this.isModalOpen = false;
   }
}  


