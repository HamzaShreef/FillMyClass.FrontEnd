import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roomStage',
  standalone: true
})
export class RoomStagePipe implements PipeTransform {

  transform(stage: number | undefined ): string {
    let translation='صف أساسي'

    switch(stage){
      case 1:
        translation='الصف الأول';
      break;
      case 2:
        translation='الصف الثاني';
      break;
      case 3:
        translation='الصف الثالث';
      break;
      case 4:
        translation='الصف الرابع';
      break;
      case 5:
        translation='الصف الخامس';
      break;
      case 6:
        translation='الصف السادس';
      break;

    }
    return translation;
  }

}
