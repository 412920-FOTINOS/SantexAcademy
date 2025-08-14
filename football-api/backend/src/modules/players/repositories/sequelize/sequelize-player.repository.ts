import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PlayerModel } from './player.model'; // Sequelize model
import { IPlayerRepository } from '../../interfaces/player-repository.interface';
import { Player } from '../../entities/player.entity';
import { UpdatePlayerDto } from '../../dto/update-player.dto';
import { CreatePlayerDto } from '../../dto/create-player.dto';


@Injectable()
export class SequelizePlayerRepository implements IPlayerRepository {
  constructor(
    @InjectModel(PlayerModel)
    private readonly playerModel: typeof PlayerModel,
  ) {}

  async findAll(): Promise<Player[]> {
    const playerList = await this.playerModel.findAll();
    return playerList.map((x) => this.mapToEntity(x));
  }

async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player | undefined> {
  const player = await this.playerModel.findByPk(id);
  if (!player) return undefined;
  await player.update({
    longName: updatePlayerDto.name,
    clubName: updatePlayerDto.club,
    playerPositions: updatePlayerDto.position,
    nationalityName: updatePlayerDto.nationality,
    overall: updatePlayerDto.rating,
    pace: updatePlayerDto.speed,
    shooting: updatePlayerDto.shooting,
    dribbling: updatePlayerDto.dribbling,
    passing: updatePlayerDto.passing,
  });
  return this.mapToEntity(player);
}

async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
  const model = await this.playerModel.create({
    longName: createPlayerDto.name,
    clubName: createPlayerDto.club,
    playerPositions: createPlayerDto.position,
    nationalityName: createPlayerDto.nationality,
    overall: createPlayerDto.rating,
    pace: createPlayerDto.speed,
    shooting: createPlayerDto.shooting,
    dribbling: createPlayerDto.dribbling,
    passing: createPlayerDto.passing,
    fifaVersion: '24',
    fifaUpdate: '1',
    playerFaceUrl: '',
    potential: createPlayerDto.rating,
    age: 20,
  } as any);
  return this.mapToEntity(model);
}

  async findOneById(id: number): Promise<Player | undefined> {
    const model = await this.playerModel.findByPk(id);
    if (!model) {
      return undefined;
    }
    return this.mapToEntity(model);
  }

  async findAndCount(options: {
    where?: any;
    take?: number;
    skip?: number;
  }): Promise<[Player[], number]> {
    const { rows, count } = await this.playerModel.findAndCountAll({
      where: options.where,
      limit: options.take,
      offset: options.skip,
    });
    const players = rows.map((row: any) => this.mapToEntity(row));
    return [players, count];
  }

private mapToEntity(model: PlayerModel): Player {
  const player = new Player();
  const data = model.dataValues; 
  player.id = data.id;
  player.name = data.longName;
  player.club = data.clubName || 'Unknown Club';
  player.position = data.playerPositions?.split(',')[0].trim() ?? 'Unknown';
  player.nationality = data.nationalityName || 'Unknown Nationality';
  player.rating = data.overall;
  player.speed = data.pace ?? null;
  player.shooting = data.shooting ?? null;
  player.dribbling = data.dribbling ?? null;
  player.passing = data.passing ?? null;
  console.log('Valores en dataValues:', data.pace, data.shooting, data.dribbling, data.passing);
  return player;
}
}