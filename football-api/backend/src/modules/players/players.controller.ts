import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
  Patch,
  Body,
  Post
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayerDto } from './dto/player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { CreatePlayerDto } from './dto/create-player.dto';



@Controller('api/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getPlayerById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PlayerDto | undefined> {
    const player = await this.playersService.getPlayerById(id);
    console.log(`Fetching player  ${player}`);
    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found.`);
    }
    return new PlayerDto(player);
  }
  
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updatePlayer(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlayerDto: UpdatePlayerDto
  ) {
    return this.playersService.updatePlayer(id, updatePlayerDto);
  }

@Post()
@HttpCode(HttpStatus.CREATED)
async createPlayer(@Body() createPlayerDto: CreatePlayerDto): Promise<PlayerDto> {
  const player = await this.playersService.createPlayer(createPlayerDto);
  return new PlayerDto(player); 
}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getPlayers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('name') name?: string,
    @Query('club') club?: string,
    @Query('position') position?: string,
    @Query('nationality') nationality?: string,
    @Query('fifaVersion') fifaVersion?: string,
  ) {
    return this.playersService.findAll({
      page: Number(page),
      limit: Number(limit),
      name,
      club,
      position,
      nationality,
      fifaVersion,
    });
  }
}

