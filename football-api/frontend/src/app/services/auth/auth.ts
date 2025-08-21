import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router'; // <-- agregá esto

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = 'http://localhost:3000/api/auth/login';

    constructor(private http: HttpClient, private router: Router) {} // <-- agregá el router

    async login(username: string, password: string): Promise<string | null> {
        try {
            const response: any = await firstValueFrom(
                this.http.post(this.apiUrl, { username, password })
            );
            if (response && response.access_token) {
                localStorage.setItem('token', response.access_token);
                this.router.navigate(['/home']);
                return response.access_token;
            }
            return null;
        } catch (err) {
            return null;
        }
    }
    async register(username: string, password: string): Promise<boolean> {
        try {
            const response: any = await firstValueFrom(
                this.http.post('http://localhost:3000/api/auth/register', { username, password })
            );
            return !!response?.message;
        } catch (err) {
            return false;
        }
    }
    logout() {
        localStorage.removeItem('token');
    }
    getToken(): string | null {
        return localStorage.getItem('token');
    }


}