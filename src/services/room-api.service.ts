import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment.development';
import { ClassRoomWithSessions } from '../models/class-room';
import { ResponsePage } from '../models/response-page';
import { UnitTimeService } from './unit-time.service';

@Injectable({
  providedIn: 'root'
})
export class RoomApiService {

  constructor(private _httpClient:HttpClient,
              private _unitTimeService:UnitTimeService) {

}

  getRoomsInfo(searchUnit:number,weekDay:number):Observable<ClassRoomWithSessions[]>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append('pageSize',20);
    queryParams = queryParams.append('pageNum',1);
    queryParams = queryParams.append('weekDay',weekDay);
    queryParams = queryParams.append('startUnit',searchUnit);

  return this._httpClient.get<ResponsePage<ClassRoomWithSessions>>(`${environment.baseApiUrl}/rooms/day-sessions`, {
      params: queryParams
    }).pipe(
      map(roomsPage => {
        roomsPage.dataList.forEach(r=>{
          this.getLiveInfoAt(searchUnit,weekDay,r);
        })
        return roomsPage.dataList;
      })
    );

  }

  getLiveRoomsInfo(searchUnit:number):Observable<ClassRoomWithSessions[]>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append('pageSize',20);
    queryParams = queryParams.append('pageNum',1);
    queryParams = queryParams.append('startUnit',searchUnit);

    let weekDay = this._unitTimeService.getCurrentWeekDay();

  return this._httpClient.get<ResponsePage<ClassRoomWithSessions>>(`${environment.baseApiUrl}/rooms/today-sessions`, {
      params: queryParams
    }).pipe(
      map(roomsPage => {
        roomsPage.dataList.forEach(r=>{
          this.getLiveInfoAt(searchUnit,weekDay,r);
        })
        return roomsPage.dataList;
      })
    );

  }

  getLiveInfoAt(currentUnit:number,weekDay:number,room:ClassRoomWithSessions):ClassRoomWithSessions{
    let currentSession = room.sessions.find(s=>s.startUnit==currentUnit && s.weekDay==weekDay);
    room.currentSubject=currentSession?.subject;
    room.currentTeacher=currentSession?.teacher.firstName+' '+currentSession?.teacher.lastName

    return room;
  }

}
