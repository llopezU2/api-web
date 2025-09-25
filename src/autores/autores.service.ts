import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAutoreDto } from './dto/create-autore.dto';
import { UpdateAutoreDto } from './dto/update-autore.dto';

@Injectable()
export class AutoresService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateAutoreDto) {
    return this.prisma.autor.create({ data });
  }
  findAll() {
    return this.prisma.autor.findMany();
  }
  async findOne(id: string) {
    const autor = await this.prisma.autor.findUnique({ where: { id_autor: id } });
    if (!autor) throw new NotFoundException('Autor no encontrado');
    return autor;
  }
  async update(id: string, data: UpdateAutoreDto) {
    await this.findOne(id);
    return this.prisma.autor.update({ where: { id_autor: id }, data });
  }
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.autor.delete({ where: { id_autor: id } });
  }
}
