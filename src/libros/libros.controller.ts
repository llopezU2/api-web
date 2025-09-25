import {
  Controller, Get, Post, Body, Param, Patch, Delete,
  Query, UsePipes, ValidationPipe, ParseUUIDPipe
} from '@nestjs/common';
import { LibrosService } from './libros.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';

@Controller('libros')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class LibrosController {
  constructor(private readonly service: LibrosService) {}

  @Post()
  create(@Body() dto: CreateLibroDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query('anio') anio?: string, @Query('clasificacion') clasificacion?: string) {
    if (anio) return this.service.byYear(Number(anio));
    if (clasificacion) return this.service.byClasificacion(clasificacion);
    return this.service.findAll();
  }

  @Get('autor/:autorId')
  byAutor(@Param('autorId', new ParseUUIDPipe()) autorId: string) {
    return this.service.byAutor(autorId);
  }

  @Get('categoria/:categoriaId')
  byCategoria(@Param('categoriaId', new ParseUUIDPipe()) categoriaId: string) {
    return this.service.byCategoria(categoriaId);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: UpdateLibroDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.remove(id);
  }
}
