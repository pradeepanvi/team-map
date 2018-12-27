import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(maps: any, value: any): any {
    //check if search value is undefined
    if(value === undefined) return maps;
    //return updated maps array
    return maps.filter((maps) => {
      return maps.name.toLowerCase().includes(value.toLowerCase());
    });
  }

}
