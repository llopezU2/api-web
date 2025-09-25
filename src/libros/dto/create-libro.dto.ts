import { IsInt, IsOptional, IsString, Min, MinLength, IsUUID } from 'class-validator';
export class CreateLibroDto {
  @IsString() @MinLength(5) titulo: string;
  @IsInt() @Min(1901) anio_publicacion: number;
  @IsUUID() autor_id: string;
  @IsUUID() categoria_id: string;
  @IsOptional() @IsString() resumen?: string;
}
