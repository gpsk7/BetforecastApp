// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/Services/auth.service';

// @Component({
//   selector: 'app-logout',
//   templateUrl: './logout.component.html',
//   styleUrls: ['./logout.component.css']
// })
// export class LogoutComponent {
//   // constructor(private authService: AuthService) { }

//   // onLogout() {
//   //   this.authService.logout(); // Implement logout logic in your authentication service
//   // }

//   confirmLogout: boolean = false;

//   constructor(private router: Router, private authService: AuthService) { }

//   onLogout() {
//     if (this.confirmLogout === false) {
      
//       // this.authService.logout();
//       this.router.navigateByUrl('/login');
//     } else {
//       alert('Please confirm logout by checking the checkbox.');
//     }
//   }
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  confirmLogout: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  onLogout() {
    if (this.confirmLogout) {
      this.authService.logout(); // Clear the token from local storage
      this.router.navigateByUrl('/login'); // Redirect to the login page
    } else {
      alert('Please confirm logout by checking the checkbox.');
    }
  }
}

