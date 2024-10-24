import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teacher } from '../models/teacher';
import { environment } from '../environments/environment.development';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  constructor(private _httpClient:HttpClient) { }

  getLiveTeacherInfo(searchUnit:number):Observable<Teacher[]>{
    let endpointParams=new HttpParams();
    endpointParams = endpointParams.append('schoolId',1);

    return this._httpClient.get<Teacher[]>(`${environment.baseApiUrl}/Teacher`,{
      params: endpointParams,
    }).pipe(
      map(apiList=>{
        return this.computeAvailable(apiList,searchUnit)
      })
    );
  }


  computeAvailable(lst:Teacher[],searchPinUnit:number=1):Teacher[]{
    lst.forEach(teacher=>{
      teacher.unitsAvailable=0;
      let searchUnitIndex = teacher.sessions.findIndex(s=>s.startUnit==searchPinUnit);

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

    })

    return lst;
  }
}
