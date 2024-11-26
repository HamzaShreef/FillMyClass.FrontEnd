import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnitTimeService {

  getCurrentUnit():number{
    let dayStart = localStorage.getItem('schoolDayStart');
    let dayRecessStart = localStorage.getItem('schoolRecessStart');
    let dayDuration = localStorage.getItem('schoolDayDuration')
    let dayRecessDuration = localStorage.getItem('schoolRecessDuration')

    //By default let's assume day starts at 8:30 (Egypt Time Zone)
    dayStart = dayStart == null ? '390' : dayStart

    //By default let's assume day recess starts at 11:30 (Egypt Time Zone)
    dayRecessStart = dayRecessStart == null ? '570' : dayRecessStart;

    //By default let's assume recess duration is 30 minutes
    dayRecessDuration = dayRecessDuration == null ? '30' : dayRecessDuration;

    //By default let's assume sessions duration is 45 minutes
    dayDuration = dayDuration == null ? '45' : dayDuration;



    let currentDate = new Date();
    let totalMinutes = currentDate.getUTCHours() * 60;
    totalMinutes += currentDate.getUTCMinutes();

    totalMinutes = totalMinutes - parseInt(dayStart);

    console.log("Total Minutes");
    console.log(totalMinutes);



    if(totalMinutes > parseInt(dayRecessStart)){
      totalMinutes = totalMinutes - parseInt(dayRecessDuration);
    }

    let currentUnit = totalMinutes / parseInt(dayDuration)
    // console.log(currentUnit);
    currentUnit = Math.ceil(currentUnit)

    console.log("current unit");
    console.log(currentUnit);

    return currentUnit
  }

   getCurrentWeekDay(){
    return new Date().getUTCDay();
   }
}
