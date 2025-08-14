export class Player {
  declare id: number;
  declare name: string;
  declare club: string;
  declare position: string;
  declare nationality: string;
  declare rating: number;
  declare speed: number | null;      
  declare shooting: number | null;   
  declare dribbling: number | null;  
  declare passing: number | null;    
  declare fifaVersion?: string;
}