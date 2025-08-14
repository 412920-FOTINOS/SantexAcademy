import { IsOptional, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';


export class GetPlayersFilterDto {
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    page: number = 1;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    limit: number = 10;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    club?: string;

    @IsOptional()
    @IsString()
    position?: string;

    @IsOptional()
    @IsString()
    nationality?: string;

    @IsOptional()
    @IsString()
    fifaVersion?: string;
}