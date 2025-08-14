import { Player } from '../../entities/player.entity';
import { IPlayerRepository } from '../../interfaces/player-repository.interface';
import { UpdatePlayerDto } from '../../dto/update-player.dto';
import { CreatePlayerDto } from '../../dto/create-player.dto';


export class InMemoryPlayerRepository implements IPlayerRepository {
  private players: Player[] = [];
  private nextId = 1;
  async findAll(): Promise<Player[]> {
    return Promise.resolve([...this.players]);
  }

  async findOneById(id: number): Promise<Player | undefined> {
    return Promise.resolve(this.players.find((p) => p.id === id));
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player | undefined> {
    const player = this.players.find(p => p.id === id);
    if (!player) return undefined;
    Object.assign(player, updatePlayerDto);
    return player;
  }

async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
  const player: Player = {
    id: this.nextId++,
    name: createPlayerDto.name,
    club: createPlayerDto.club,
    position: createPlayerDto.position,
    nationality: createPlayerDto.nationality,
    rating: createPlayerDto.rating,
    speed: createPlayerDto.speed ?? 0,
    shooting: createPlayerDto.shooting ?? 0,
    dribbling: createPlayerDto.dribbling ?? 0,
    passing: createPlayerDto.passing ?? 0,
  };
  this.players.push(player);
  return player;
}

  async findAndCount(options: {
    where?: any;
    take?: number;
    skip?: number;
  }): Promise<[Player[], number]> {
    const total = this.players.length;
    const data = [...this.players];
        return [data, total];
  }
}