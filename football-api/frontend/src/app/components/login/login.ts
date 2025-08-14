import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    styleUrls: ['./login.css'],
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterLink]
})
export class LoginComponent {
    loginForm: FormGroup;
    error: string | null = null;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    async onSubmit() {
        if (this.loginForm.valid) {
            const { username, password } = this.loginForm.value;
            const token = await this.authService.login(username, password);
            if (token) {
                this.error = null;
                this.router.navigate(['/players']);
            } else {
                this.error = 'Usuario o contraseña incorrectos';
            }
        } else {
            this.error = 'Completa todos los campos';
        }
    }
}