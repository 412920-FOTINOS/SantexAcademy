import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../services/player/player';
import { Router } from '@angular/router';


@Component({
    selector: 'app-player-detail',
    templateUrl: './player-detail.html',
    styleUrls: ['./player-detail.css'],
    imports: [CommonModule],
    standalone: true
})
export class PlayerDetailComponent implements OnInit {
    player: any;
    playerId: string | null = null;
    constructor(
        private route: ActivatedRoute, 
        private playerService: PlayerService,
        private router: Router
    ) {}
    ngOnInit() {
        this.playerId = this.route.snapshot.paramMap.get('id');
        if (this.playerId) {
            this.playerService.getPlayerById(this.playerId).subscribe(data => {
                this.player = data;
            });
        }
    }
    volverAlListado() {
        this.router.navigate(['/players']);
    }
}