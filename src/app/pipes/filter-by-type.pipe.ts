import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByType'
})
export class FilterByTypePipe implements PipeTransform {
  transform(usuarios: any[], tipo: string): any[] {
    return usuarios.filter(usuario => usuario.tipo_usuario === tipo);
  }
}
