import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  
  constructor(private snackBar: MatSnackBar) { }

  show(message: string, action: string = 'Close', duration: number = 1500, config?: MatSnackBarConfig) {
    const defaultConfig: MatSnackBarConfig = {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      ...config
    };
    this.snackBar.open(message, action, defaultConfig);
  }
  
  showError(message: string) {
    this.show(message, 'Close', 3000); 
  }
  
}