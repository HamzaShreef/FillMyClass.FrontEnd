import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teacher } from '../models/teacher';
import { environment } from '../environments/environment.development';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { ResponsePage } from '../models/response-page';
import { ClassRoom, ClassRoomWithSessions } from '../models/class-room';
import { UnitTimeService } from './unit-time.service';
import { Session, SessionWithRoom } from '../models/session';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  constructor(private _httpClient:HttpClient,private _unitTimeMapper:UnitTimeService) { }

  getLiveTeachersInfo():Observable<Teacher[]>{
    let endpointParams=new HttpParams();
    endpointParams = endpointParams.append('pageSize',50);
    endpointParams = endpointParams.append('pageNum',1);
    let searchUnit = this._unitTimeMapper.getCurrentUnit();
    // searchUnit = 5;


    return this._httpClient.get<ResponsePage<Teacher>>(`${environment.baseApiUrl}/teachers/today-sessions`,{
      params: endpointParams,
    }).pipe(
      map(apiResponse=>{
        console.log("serachUnit");

        console.log(searchUnit);

        return this.computeAvailable(apiResponse.dataList,searchUnit)
      })
    );
  }


  computeAvailable(lst:Teacher[],searchPinUnit:number):Teacher[]{
    lst.forEach(teacher=>{
      this.computeTeacherState(teacher,searchPinUnit)
    })

    return lst;
  }

  computeTeacherState(teacher:Teacher,searchPinUnit:number):Teacher{
    teacher.unitsAvailable=0;
      let searchUnitIndex = teacher.sessions.findIndex(s=>s.startUnit==searchPinUnit);
      console.log("searchUnit Index");
      console.log(searchUnitIndex);
      console.log(searchPinUnit);




      if(searchUnitIndex != -1){
        teacher.available=false;
        teacher.unitsAvailable++;
        let sessionAt = teacher.sessions[searchUnitIndex];
        teacher.classRoomAt=sessionAt.classRoom?.name;
        teacher.roomStageAt=sessionAt.classRoom?.stage;
        teacher.subjectAt=sessionAt.subject;
        try{
          let session = teacher.sessions[searchUnitIndex+1]
          if(session != undefined && session.classRoom?.name == teacher.classRoomAt){
            teacher.unitsAvailable++;
          }
        }catch{
          teacher.unitsAvailable=1;
        }
      }

      let searchPin = searchPinUnit
      while(searchUnitIndex == -1 && searchPin < 8){
        searchPin=searchPin+1
        teacher.available=true;
        teacher.unitsAvailable++;
        searchUnitIndex=teacher.sessions.findIndex(s=>s.startUnit == searchPin)
      }

    return teacher;
  }

  getTeacherLiveInfo(teacherId:number){
    let responseTeacher:Teacher | undefined;
    let currentSearchUnit = this._unitTimeMapper.getCurrentUnit();
    // currentSearchUnit = 5;
    let today = this._unitTimeMapper.getCurrentWeekDay();
    let allSessions: SessionWithRoom[]

    return this._httpClient.get<Teacher>(`${environment.baseApiUrl}/teachers/${teacherId}`)
                              .pipe(map(t=>{
                                if(t != undefined && t != null){
                                    allSessions = t.sessions;
                                    t.sessions = allSessions.filter(te => te.weekDay == today).sort((t1,t2)=>{
                                    return t1.startUnit - t2.startUnit
                                  })

                                  responseTeacher = this.computeTeacherState(t,currentSearchUnit);
                                  responseTeacher.sessions=allSessions

                                  return responseTeacher
                                }

                                return t;
                              }),catchError(error => {
                                if (error.status === 404) {
                                  // Return undefined if the response is 404
                                  return of(undefined);
                                }
                                // Re-throw other errors
                                return throwError(error);
                              })
                            );
  }
}
