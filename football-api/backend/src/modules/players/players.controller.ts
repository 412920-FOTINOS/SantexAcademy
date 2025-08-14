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
  Post,
  ValidationPipe
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { PlayersService } from './players.service';
import { PlayerDto } from './dto/player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { CreatePlayerDto } from './dto/create-player.dto';
import { GetPlayersFilterDto } from './dto/get-players-filter.dto';

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
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'club', required: false, type: String })
  @ApiQuery({ name: 'position', required: false, type: String })
  @ApiQuery({ name: 'nationality', required: false, type: String })
  @ApiQuery({ name: 'fifaVersion', required: false, type: String })
  @HttpCode(HttpStatus.OK)
  async getPlayers(
    @Query(new ValidationPipe({ transform: true })) filters: GetPlayersFilterDto
  ) {
    return this.playersService.findAll(filters);
  }
}