import { Player } from '../entities/player.entity';
import { UpdatePlayerDto } from '../dto/update-player.dto';
import { CreatePlayerDto } from '../dto/create-player.dto';


export interface IPlayerRepository {
  findAll(): Promise<Player[]>;
  findOneById(id: number): Promise<Player | undefined>;
  update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player | undefined>;
  create(createPlayerDto: CreatePlayerDto): Promise<Player>;
  findAndCount(options: {
    where?: any;
    take?: number;
    skip?: number;
  }): Promise<[Player[], number]>;
}