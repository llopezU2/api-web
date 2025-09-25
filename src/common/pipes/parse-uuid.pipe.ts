import { BadRequestException, PipeTransform } from '@nestjs/common';
import { validate as isUuid } from 'uuid';
export class ParseUUIDPipe implements PipeTransform<string> {
  transform(value: string) {
    if (!isUuid(value)) throw new BadRequestException('UUID inválido');
    return value;
  }
}
