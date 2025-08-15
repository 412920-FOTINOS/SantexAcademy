import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PlayerService } from '../../services/player/player';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-player-create',
    templateUrl: './player-create.html',
    styleUrls: ['./player-create.css'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule]
})
export class PlayerCreateComponent {
    createForm: FormGroup;
    success: boolean = false;
    error: string | null = null;

    constructor(
        private fb: FormBuilder,
        private playerService: PlayerService,
        private router: Router
    ) {
    this.createForm = this.fb.group({
        name: ['', Validators.required],
        club: ['', Validators.required],
        position: ['', Validators.required],
        nationality: ['', Validators.required],
        rating: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
        speed: [null, [Validators.min(0), Validators.max(99)]],
        shooting: [null, [Validators.min(0), Validators.max(99)]],
        dribbling: [null, [Validators.min(0), Validators.max(99)]],
        passing: [null, [Validators.min(0), Validators.max(99)]],
        fifaVersion: ['']
    });
}

    onSubmit() {
        if (this.createForm.valid) {
            this.playerService.createPlayer(this.createForm.value).subscribe({
                next: () => {
                    this.success = true;
                    this.error = null;
                    setTimeout(() => this.router.navigate(['/players']), 1500);
                },
                error: err => {
                    this.error = 'Error al crear el jugador';
                    this.success = false;
                }
            });
        }
    }
}