import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiplyElement'
})
export class MultiplyElementPipe implements PipeTransform {

  transform(value: any) {
    return (new Array(value));
  }

}
