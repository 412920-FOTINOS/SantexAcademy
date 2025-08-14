import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';

export class UpdatePlayerDto {
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
    @IsInt()
    @Min(1)
    @Max(99)
    rating?: number;

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