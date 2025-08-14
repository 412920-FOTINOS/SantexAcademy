import { Inject, Injectable } from '@nestjs/common';
import { IPlayerRepository } from './interfaces/player-repository.interface';
import { Player } from './entities/player.entity';
import { Op } from 'sequelize';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { CreatePlayerDto } from './dto/create-player.dto';


@Injectable()
export class PlayersService {
  constructor(
    @Inject('IPlayerRepository')
    private readonly playerRepository: IPlayerRepository,
  ) {}

  getPlayerById(id: number): Promise<Player | undefined> {
    return this.playerRepository.findOneById(id);
  }

  async updatePlayer(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player | undefined> {
    return this.playerRepository.update(id, updatePlayerDto);
  }

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playerRepository.create(createPlayerDto);
  } 

    async findAll(filters: {
    page: number;
    limit: number;
    name?: string;
    club?: string;
    position?: string;
    nationality?: string;
    fifaVersion?: string;
  }): Promise<{ data: Player[]; total: number }> {
    // Construye el objeto de filtros para el repositorio
    const where: any = {};
    if (filters.name) where.longName = { [Op.like]: `%${filters.name}%` };
    if (filters.club) where.clubName = { [Op.like]: `%${filters.club}%` };
    if (filters.position) where.playerPositions = filters.position;
    if (filters.nationality) where.nationalityName = { [Op.like]: `%${filters.nationality}%` };
    if (filters.fifaVersion) where.fifaVersion = { [Op.like]: `%${filters.fifaVersion}%` };

    // Calcular offset
    const offset = (filters.page - 1) * filters.limit;

    // Llama al repositorio
    const [data, total] = await this.playerRepository.findAndCount({
      where,
      take: filters.limit,
      skip: offset,
    });

    return { data, total };
  }
}
