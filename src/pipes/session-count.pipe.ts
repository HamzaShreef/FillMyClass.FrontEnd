import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sessionCount',
  standalone: true
})
export class SessionCountPipe implements PipeTransform {

  transform(count:number): string {
    let translation='حصتين'
    switch(count){
      case 1:
        translation='حصة واحدة'
        break;
      case 2:
        translation='حصتين'
      break;
      case 3:
        translation='ثلاث حصص'
        break;
      case 4:
        translation='أربع حصص'
      break;
      case 5:
        translation='خمس حصص'
        break;
      case 6:
        translation='ست حصص'
      break;
      case 7:
        translation='سبع حصص'
      break;
      default:
        translation=count.toString();
    }

    return translation
  }

}
