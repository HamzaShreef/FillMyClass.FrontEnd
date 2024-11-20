import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber',
  standalone: true
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string | undefined): string {
    if(value == null || value == undefined){
      return 'لايوجد'
    }

    return value;
  }

}
