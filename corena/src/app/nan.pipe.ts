import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nan'
})
export class NanPipe implements PipeTransform {

  transform(value: any, args?: any): any {
      if (+value>0){
          return value
      }
    return "";
  }

}
