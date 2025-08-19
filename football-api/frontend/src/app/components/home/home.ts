import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.html',
    styleUrls: ['./home.css'],
    standalone: true,
    imports: [CommonModule]
})
export class HomeComponent {
    constructor(private router: Router) {}

    irALista() {
        this.router.navigate(['/players']);
    }

    irACrear() {
        this.router.navigate(['/create-player']);
    }
}