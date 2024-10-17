import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/users'; // Adjust the URL as needed

  constructor(private http: HttpClient) { }

  registerUser(user: any) {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }
  loginUser(credentials: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  getUserProfile() {
    // Get the authenticated user's profile
    return this.http.get(`${this.apiUrl}/home`);
  }

  updateUserProfile(updatedProfile: any) {
    //  Update the authenticated user's profile
    return this.http.put(`${this.apiUrl}/home`, updatedProfile);
  }

  changePassword(passwordData: { oldPassword: string; newPassword: string }) {
    //  Change the authenticated user's password
    return this.http.post(`${this.apiUrl}/change-password`, passwordData);
  }

  logoutUser() {
    //  Log out the authenticated user
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

}
