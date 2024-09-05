import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  // Login method that sends credentials to the server
  login(username: string, password: string) {
    return this.http.post('http://localhost:3000/login', { username, password });
  }

  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check if token exists and is not expired
    return !this.jwtHelper.isTokenExpired(token || undefined);
  }
}

