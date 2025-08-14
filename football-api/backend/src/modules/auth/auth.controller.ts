import { Controller, Post, Body, UnauthorizedException, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { username: string; password: string }) {
        const token = await this.authService.validateUser(body.username, body.password);
        if (!token) throw new UnauthorizedException('Credenciales inválidas');
        return { access_token: token };
    }

    @Post('register')
    async register(@Body() body: { username: string; password: string }) {
        const user = await this.authService.registerUser(body.username, body.password);
        if (!user) throw new ConflictException('El usuario ya existe');
        return { message: 'Usuario creado correctamente' };
    }
}