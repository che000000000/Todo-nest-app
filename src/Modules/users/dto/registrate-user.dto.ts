import { ArrayNotEmpty, IsArray, IsOptional, IsString } from "class-validator";

export class RegistrateUserDto {
    @IsString()
    userName: string

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    specialization?: string[];

    @IsOptional()
    @IsString()
    avatarUrl?: string
}