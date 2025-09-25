// src/categorias/categorias.controller.ts
import {
  Controller, Get, Post, Body, Param, Patch, Delete,
  UsePipes, ValidationPipe, ParseUUIDPipe,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categorias')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class CategoriasController {
  constructor(private readonly service: CategoriasService) {}

  @Post()
  create(@Body() dto: CreateCategoriaDto) {
    // Devuelve el objeto creado (con id_categoria)
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateCategoriaDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.remove(id);
  }
}
