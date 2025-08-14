import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private users: { username: string; password: string }[] = [{ username: 'admin', password: 'admin' }];

    constructor(private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<string | null> {
        const user = this.users.find(u => u.username === username && u.password === password);
        if (user) {
            return this.jwtService.sign({ username });
        }
        return null;
    }

    async registerUser(username: string, password: string): Promise<{ username: string } | null> {
        const exists = this.users.some(u => u.username === username);
        if (exists) return null;
        this.users.push({ username, password });
        return { username };
    }
}