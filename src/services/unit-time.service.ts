import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnitTimeService {

  getCurrentUnit():number{
    let dayStart = localStorage.getItem('schoolDayStart');
    let dayRecessStart = localStorage.getItem('schoolRecessStart');
    let unitDuration = localStorage.getItem('schoolunitDuration')
    let dayRecessDuration = localStorage.getItem('schoolRecessDuration')

    //By default let's assume day starts at 8:00 (Egypt Time Zone)
    dayStart = dayStart == null ? '360' : dayStart

    //By default let's assume day recess starts at 11:30 (Egypt Time Zone)
    dayRecessStart = dayRecessStart == null ? '540' : dayRecessStart;

    //By default let's assume recess duration is 30 minutes
    dayRecessDuration = dayRecessDuration == null ? '30' : dayRecessDuration;

    //By default let's assume sessions duration is 45 minutes
    unitDuration = unitDuration == null ? '45' : unitDuration;



    let currentDate = new Date();
    console.log("date: ");
    console.log(currentDate);


    let totalMinutes = currentDate.getUTCHours() * 60;
    totalMinutes += currentDate.getUTCMinutes();


    if(totalMinutes > parseInt(dayRecessStart)){
      console.log("after recess");

      totalMinutes = totalMinutes - parseInt(dayRecessDuration);
    }

    totalMinutes = totalMinutes - parseInt(dayStart);

    console.log("Total Minutes");
    console.log(totalMinutes);


    //console.log("before recess");



    let currentUnit = totalMinutes / parseInt(unitDuration)
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
