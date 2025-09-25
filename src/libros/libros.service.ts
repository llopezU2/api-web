import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';

@Injectable()
export class LibrosService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateLibroDto) {
    return this.prisma.libro.create({ data });
  }

  findAll() {
    return this.prisma.libro.findMany({ include: { autor: true, categoria: true } });
  }

  async findOne(id: string) {
    const libro = await this.prisma.libro.findUnique({
      where: { id_libro: id },
      include: { autor: true, categoria: true },
    });
    if (!libro) throw new NotFoundException('Libro no encontrado');
    return libro;
  }

  async update(id: string, data: UpdateLibroDto) {
    await this.findOne(id);
    return this.prisma.libro.update({ where: { id_libro: id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.libro.delete({ where: { id_libro: id } });
  }

  byYear(anio: number) {
    return this.prisma.libro.findMany({
      where: { anio_publicacion: anio },
      include: { autor: true, categoria: true },
    });
  }

  byAutor(autorId: string) {
    return this.prisma.libro.findMany({
      where: { autor_id: autorId },
      include: { autor: true, categoria: true },
    });
  }

  byCategoria(categoriaId: string) {
    return this.prisma.libro.findMany({
      where: { categoria_id: categoriaId },
      include: { autor: true, categoria: true },
    });
  }

  byClasificacion(clasificacion: string) {
    return this.prisma.libro.findMany({
      where: { categoria: { clasificacion: { equals: clasificacion, mode: 'insensitive' } } },
      include: { autor: true, categoria: true },
    });
  }
}
