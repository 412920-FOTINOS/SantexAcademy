import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = 'http://localhost:3000/api/auth/login'; // Ajustá la URL si tu backend es diferente

    constructor(private http: HttpClient) {}

async register(username: string, password: string): Promise<boolean> {
    try {
        await firstValueFrom(
        this.http.post('http://localhost:3000/api/auth/register', { username, password })
        );
        return true;
    } catch (err) {
        return false;
    }
}

    async login(username: string, password: string): Promise<string | null> {
        try {
        const response: any = await firstValueFrom(
            this.http.post(this.apiUrl, { username, password })
        );
        if (response && response.access_token) {
            localStorage.setItem('token', response.access_token);
            return response.access_token;
        }
        return null;
        } catch (err) {
        return null;
        }
    }



    logout() {
        localStorage.removeItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}