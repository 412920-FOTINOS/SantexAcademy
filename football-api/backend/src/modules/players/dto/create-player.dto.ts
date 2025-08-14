import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';

export class CreatePlayerDto {
    @IsString()
    name: string;

    @IsString()
    club: string;

    @IsString()
    position: string;

    @IsString()
    nationality: string;

    @IsInt()
    @Min(1)
    @Max(99)
    rating: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(99)
    speed?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(99)
    shooting?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(99)
    dribbling?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(99)
    passing?: number;
}