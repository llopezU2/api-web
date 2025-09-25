// src/categorias/categorias.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCategoriaDto) {
    return this.prisma.categoria.create({ data });
  }

  findAll() {
    return this.prisma.categoria.findMany();
  }

  async findOne(id: string) {
    const cat = await this.prisma.categoria.findUnique({
      where: { id_categoria: id },
    });
    if (!cat) throw new NotFoundException('Categoría no encontrada');
    return cat;
  }

  async update(id: string, data: UpdateCategoriaDto) {
    await this.findOne(id);
    return this.prisma.categoria.update({
      where: { id_categoria: id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.categoria.delete({ where: { id_categoria: id } });
  }
}
