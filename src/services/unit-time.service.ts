import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnitTimeService {

  getCurrentUnit():number{
    let dayStart = localStorage.getItem('schoolDayStart');
    //By default let's assume day starts at 8:30
    dayStart = dayStart == null ? '510' : dayStart

    let dayDuration = localStorage.getItem('schoolDayDuration')
    //By default let's assume sessions duration is 45 minutes
    dayDuration = dayDuration == null ? '45' : dayDuration;



    let currentDate = new Date();
    let totalMinutes = currentDate.getUTCHours() * 60;
    totalMinutes += currentDate.getUTCMinutes();

    totalMinutes = totalMinutes - parseInt(dayStart);

    let currentUnit = totalMinutes / parseInt(dayDuration)
    // console.log(currentUnit);
    currentUnit = Math.ceil(currentUnit)

    // console.log(currentUnit);

    return currentUnit
  }

   getCurrentWeekDay(){
    return new Date().getUTCDay();
   }
}
