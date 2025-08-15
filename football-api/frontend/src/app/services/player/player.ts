import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Player {
  id: number;
  name: string;
  club: string;
  position: string;
  nationality: string;
  rating: number;
  speed: number;
  shooting: number;
  dribbling: number;
  passing: number;
  fifaVersion?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private baseUrl = 'http://localhost:3000/api/players';

  constructor(private http: HttpClient) {}

  getPlayer(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.baseUrl}/${id}`);
  }

  getPlayerById(id: number | string): Observable<Player> {
    return this.http.get<Player>(`${this.baseUrl}/${id}`);
}

  getPlayers(params: any): Observable<{ data: Player[]; total: number }> {
    const query = new URLSearchParams(params).toString();
    return this.http.get<{ data: Player[]; total: number }>(`${this.baseUrl}?${query}`);
  }

    createPlayer(playerData: Partial<Player>): Observable<Player> {
    return this.http.post<Player>(this.baseUrl, playerData);
  }
}