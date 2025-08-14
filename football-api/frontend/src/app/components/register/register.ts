import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.html',
    styleUrls: ['./register.css'],
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterLink]
})
export class RegisterComponent {
    registerForm: FormGroup;
    message: string | null = null;
    error: string | null = null;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.registerForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    async onSubmit() {
        if (this.registerForm.valid) {
            const { username, password } = this.registerForm.value;
            const result = await this.authService.register(username, password);
            if (result) {
                this.message = 'Usuario creado correctamente';
                this.error = null;
                setTimeout(() => {
                    this.router.navigate(['/login']);
                }, 1200);
            } else {
                this.error = 'El usuario ya existe';
                this.message = null;
            }
        } else {
            this.error = 'Completa todos los campos';
            this.message = null;
        }
    }
}