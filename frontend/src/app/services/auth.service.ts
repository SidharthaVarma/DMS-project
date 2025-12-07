import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  googleLogin(idToken: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/google-login`, { token: idToken });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
  register(data: any) {
  return this.http.post<any>(`${this.apiUrl}/register`, data);
}

}
