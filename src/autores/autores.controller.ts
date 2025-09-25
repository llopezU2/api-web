// src/autores/autores.controller.ts
import {
  Controller, Get, Post, Body, Param, Patch, Delete,
  UsePipes, ValidationPipe, ParseUUIDPipe, // <-- aquí
} from '@nestjs/common';
import { AutoresService } from './autores.service';
import { CreateAutoreDto } from './dto/create-autore.dto';
import { UpdateAutoreDto } from './dto/update-autore.dto';

@Controller('autores')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class AutoresController {
  constructor(private readonly autoresService: AutoresService) {}

  @Post()
  create(@Body() dto: CreateAutoreDto) {
    return this.autoresService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) { // sin '+'
    return this.autoresService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,          // sin '+'
    @Body() dto: UpdateAutoreDto,                            // (si tu dto se llama updateAutoreDto, usa ese nombre)
  ) {
    return this.autoresService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {    // sin '+'
    return this.autoresService.remove(id);
  }
}
