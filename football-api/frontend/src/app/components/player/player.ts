import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService, Player } from '../../services/player/player';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-player',
  templateUrl: './player.html',
  styleUrls: ['./player.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class PlayerComponent {
  players: Player[] = [];
  total = 0;
  page = 1;
  limit = 10;
  filterForm: FormGroup;

  constructor(private playerService: PlayerService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      name: [''],
      club: [''],
      position: [''],
      nationality: ['']
    });
    this.loadPlayers();
  }

  loadPlayers() {
    const filters = { ...this.filterForm.value, page: this.page, limit: this.limit };
    this.playerService.getPlayers(filters).subscribe(result => {
      this.players = result.data;
      this.total = result.total;
    });
  }

  onFilter() {
    this.page = 1;
    this.loadPlayers();
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.loadPlayers();
  }

  exportCSV() {
    const worksheet = XLSX.utils.json_to_sheet(this.players);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Jugadores');
    const csvData = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
    const blob = new Blob([csvData], { type: 'text/csv' });
    saveAs(blob, 'jugadores.csv');
  }
}