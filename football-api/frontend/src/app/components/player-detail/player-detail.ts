import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlayerService, Player } from '../../services/player/player';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-player-detail',
    templateUrl: './player-detail.html',
    styleUrls: ['./player-detail.css'],
    imports: [CommonModule, ReactiveFormsModule],
    standalone: true
})
export class PlayerDetailComponent implements OnInit {
    player: Player | null = null;
    playerId: string | null = null;
    editMode = false;
    editForm!: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private playerService: PlayerService,
        private router: Router,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.playerId = this.route.snapshot.paramMap.get('id');
        if (this.playerId) {
            this.playerService.getPlayerById(this.playerId).subscribe(data => {
                this.player = data;
                this.initForm();
            });
        }
    }

    initForm() {
        this.editForm = this.fb.group({
            name: [this.player?.name, Validators.required],
            club: [this.player?.club, Validators.required],
            position: [this.player?.position, Validators.required],
            nationality: [this.player?.nationality, Validators.required],
            rating: [this.player?.rating, [Validators.required, Validators.min(1), Validators.max(99)]],
            speed: [this.player?.speed],
            shooting: [this.player?.shooting],
            dribbling: [this.player?.dribbling],
            passing: [this.player?.passing],
            fifaVersion: [this.player?.fifaVersion]
        });
    }

    activarEdicion() {
        this.editMode = true;
        this.editForm.patchValue(this.player!);
    }

    cancelarEdicion() {
        this.editMode = false;
        this.editForm.reset(this.player!);
    }

    guardarCambios() {
        if (this.editForm.valid && this.playerId) {
            this.playerService.updatePlayer(+this.playerId, this.editForm.value).subscribe({
                next: (data) => {
                    this.player = data;
                    this.editMode = false;
                }
            });
        }
    }

    volverAlListado() {
        this.router.navigate(['/players']);
    }
}