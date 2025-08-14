import { Repository } from 'typeorm';
import { Player } from '../../entities/player.entity';
import { IPlayerRepository } from '../../interfaces/player-repository.interface';
import { PlayerDto } from './player.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePlayerDto } from '../../dto/update-player.dto';
import { CreatePlayerDto } from '../../dto/create-player.dto';

@Injectable()
export class TypeOrmPlayerRepository implements IPlayerRepository {
  constructor(
    @InjectRepository(PlayerDto)
    private readonly playerRepository: Repository<PlayerDto>,
  ) {}

  async findAll(): Promise<Player[]> {
    const playerList = (await this.playerRepository.find()).map((x) =>
      this.mapToEntity(x),
    );
    return playerList;
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player | undefined> {
    const playerDto = await this.playerRepository.findOne({ where: { id } });
    if (!playerDto) return undefined;
    Object.assign(playerDto, updatePlayerDto);
    await this.playerRepository.save(playerDto);
    return this.mapToEntity(playerDto);
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const player = this.playerRepository.create(createPlayerDto);
    await this.playerRepository.save(player);
    return this.mapToEntity(player);
  }
  
  async findOneById(id: number): Promise<Player | undefined> {
    const dto = await this.playerRepository.findOne({ where: { id } });
    if (dto === null) {
      return undefined;
    }
    const entity = this.mapToEntity(dto);
    return entity;
  }

  private mapToEntity(playerDto: PlayerDto): Player {
    const player = new Player();
    player.id = playerDto.id;
    player.name = playerDto.longName;
    player.club = playerDto.clubName || 'Unknown Club';
    player.position = playerDto.playerPositions.split(',')[0].trim();
    player.nationality = playerDto.nationalityName || 'Unknown Nationality';
    player.rating = playerDto.overall;
    player.speed = playerDto.pace ?? 0;
    player.shooting = playerDto.shooting ?? 0;
    player.dribbling = playerDto.dribbling ?? 0;
    player.passing = playerDto.passing ?? 0;
    return player;
  }
  async findAndCount(options: {
    where?: any;
    take?: number;
    skip?: number;
  }): Promise<[Player[], number]> {
    const [dtos, total] = await this.playerRepository.findAndCount({
      where: options.where,
      take: options.take,
      skip: options.skip,
    });
    const players = dtos.map((dto) => this.mapToEntity(dto));
    return [players, total];
  }
}