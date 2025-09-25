import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
export class CreateAutoreDto {
  @IsString() @MinLength(1) nombre: string;
  @IsOptional() @IsString() nacionalidad?: string;
  @IsOptional() @IsString() biografia?: string;
  @IsEmail() correo: string;
}
