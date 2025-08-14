import { Inject, Injectable } from '@nestjs/common';
import { IPlayerRepository } from './interfaces/player-repository.interface';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @Inject('IPlayerRepository')
    private readonly playerRepository: IPlayerRepository,
  ) {}

  getPlayerById(id: number): Promise<Player | undefined> {
    return this.playerRepository.findOneById(id);
  }

  //Creao
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
    if (filters.name) where.longName = filters.name;
    if (filters.club) where.clubName = filters.club;
    if (filters.position) where.playerPositions = filters.position;
    if (filters.nationality) where.nationalityName = filters.nationality;
    if (filters.fifaVersion) where.fifaVersion = filters.fifaVersion;

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
