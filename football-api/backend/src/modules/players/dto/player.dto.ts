export class PlayerDto {
  id: number;
  name: string;
  club: string;
  position: string;
  nationality: string;
  rating: number;
  speed?: number | null;
  shooting?: number | null;
  dribbling?: number | null;
  passing?: number | null;

  constructor(player: Partial<PlayerDto>) {
    Object.assign(this, player);
  }
}