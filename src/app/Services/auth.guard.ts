// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';
// import { AuthService } from './auth.service'; // Adjust path as necessary

// export const authGuard: CanActivateFn = (route, state) => {
//   // Inject the AuthService and Router instances
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   // Check if the user is authenticated
//   if (authService.isAuthenticated()) {
//     return true;
//   } else {
//     // Redirect to the login page if not authenticated
//     router.navigate(['/login']);
//     return false;
//   }
// };

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service'; // Adjust path as necessary

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;

  }
};

