import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { RaceService } from 'src/app/Services/race.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit{

  displayedColumns = [
    'raceId',
    'horseBallot',
    // 'speed',
    // 'dayValue',
    // 'finishPos',
    'horseName',
    'jockeyName',
    'trainerName', 
    // 'horseNameCount',
    // 'jockeyNameCount',
    // 'trainerNameCount',
    // 'drawnStall',
    // 'predictionColor',
    "form",
    "place"
  ];

  raceNumbersAndTimes: { raceNumber: string, time: string }[] = [];
  raceDetails: any[] = [];

  country: string = '';
  course: string = '';
  selectedDate: string = '';
  selectedRaceNumberAndTime: string = '';
  participatingHorsesCount: number = 0;

  constructor(
    private raceService: RaceService,
    private snackbarService: SnackbarService,
    private translate: TranslateService,
    private router: ActivatedRoute,
    private route: Router,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    translate.setDefaultLang('en');
    translate.use('en');

    this.router.queryParams.subscribe(params => {
      this.country = params['country'];
      this.selectedDate = params['date'];
      this.course = params['course'];
    });
  }

  ngOnInit(): void {
    this.getRaceNumbersAndTimes();
  }

  getTranslation(key: string): Observable<string> {
    return this.translate.get(key);
  }


  getRaceNumbersAndTimes(): void {
    console.log(this.country, this.selectedDate, this.course);
    if (this.country && this.selectedDate && this.course) {
      this.raceService.getRaceNumbersAndTimes(this.country, this.selectedDate, this.course).subscribe(data => {
        this.raceNumbersAndTimes = data;
        console.log('Fetched race numbers and times:', this.raceNumbersAndTimes);

        // Automatically select the first race time (if available)
        if (this.raceNumbersAndTimes.length > 0) {
          this.selectRaceTime(this.raceNumbersAndTimes[0]); // Select the first race
        }
      });
    }
  }

  get totalRaces(): number {
    return this.raceNumbersAndTimes.length;
  }

  selectRaceTime(race: any): void {
    this.selectedRaceNumberAndTime = race.raceNumber;
    console.log('Selected Race:', race);
    this.getRaceDetails();
  }
  
  getRaceDetails(): void {
    console.log('Fetching details for Race Number:', this.selectedRaceNumberAndTime);
    if (this.country && this.selectedDate && this.course && this.selectedRaceNumberAndTime) {
      this.raceService.getDetailsByCountryAndDateAndCourseAndRaceId(this.country, this.selectedDate, this.course, this.selectedRaceNumberAndTime)
        .subscribe(data => {
          console.log('Race details fetched:', data); // Log race details response
          this.raceDetails = data.map(race => ({
            ...race,
            horseNameCount: this.calculateNameCount(race.horseName),
            jockeyNameCount: this.calculateNameCount(race.jockeyName),
            trainerNameCount: this.calculateNameCount(race.trainerName),
          }));
          this.participatingHorsesCount = this.calculateParticipatingHorses();
          console.log('Processed race details:', this.raceDetails); // Log processed race details
        }, error => {
          console.error('Error fetching race details:', error);
        });
    }
  }

  formatSelectedDate(dateString: string): string {
    // Split the string into day, month, and year
    const [day, month, year] = dateString.split('-');
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Get the month name from the array
    const monthName = monthNames[parseInt(month, 10) - 1]; // Convert month to 0-indexed
    return `${parseInt(day, 10)} ${monthName} ${year}`; // Return formatted string
  }
  

  calculateNameCount(name: string): number {
    console.log('Calculating name count for:', name); // Log the name
  if (!name) {
    return 0;
  }
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

  // back() {
  //   this.route.navigate(['/home']);
  // }
  

  // back(): void {
  //   // Pass the previously selected date back to the Home component
  //   this.route.navigate(['/home'], {
  //     queryParams: { date: this.selectedDate, country: this.country, course: this.course }
  //   });
  // }

  back(): void {
    // Pass the previously selected date back to the Home component
    this.route.navigate(['/home'], {
      queryParams: { date: this.selectedDate, country: this.country, course: this.course }
    });
  }
  

  calculateParticipatingHorses(): number {
    if (this.raceDetails && this.raceDetails.length > 0) {
      return this.raceDetails.length; // Update this logic if you need to calculate differently
    }
    return 0; 
  }
}
