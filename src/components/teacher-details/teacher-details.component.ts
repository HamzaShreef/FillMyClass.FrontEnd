import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../models/teacher';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../../services/api-service.service';
import { RoomStagePipe } from '../../pipes/room-stage.pipe';
import { PhoneNumberPipe } from '../../pipes/phone-number.pipe';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddTeacherSessionPopupComponent } from '../add-teacher-session-popup/add-teacher-session-popup.component';

@Component({
  selector: 'app-teacher-details',
  standalone: true,
  imports: [CommonModule,RoomStagePipe,PhoneNumberPipe],
  templateUrl: './teacher-details.component.html',
  styleUrl: './teacher-details.component.css'
})
export class TeacherDetailsComponent implements OnInit{
  teacher:Teacher | undefined
  constructor(private _activatedRoute:ActivatedRoute,
              private _router:Router,
              private _apiService:ApiServiceService,
              private _addSessionDialog: MatDialog){

  }

  ngOnInit(): void {
    let teacherId = Number(this._activatedRoute.snapshot.paramMap.get('id'))
    this._apiService.getTeacherLiveInfo(teacherId).subscribe(
      teacherInfo => {
        if(teacherInfo == undefined){
          this._router.navigateByUrl("notfound")
        }


        this.teacher=teacherInfo;
        }
    )

  }

  addSession(){
    this._addSessionDialog.open(AddTeacherSessionPopupComponent);
  }

  getSession(wDay:number,sessionUnit:number){
    let result
    let currSession = this.teacher?.sessions.find(s=>s.weekDay == wDay && s.startUnit==sessionUnit)
    if(currSession != undefined){
      result = currSession.classRoom?.name
    }

    if(sessionUnit == 7){
      wDay=wDay+1;
      sessionUnit=0
    }

    sessionUnit=sessionUnit+1;

    // console.log("weekday");
    // console.log(wDay);
    // console.log("startUnit");
    // console.log(sessionUnit);
    // console.log("room");
    // console.log(currSession?.classRoom?.name);





    if(result == undefined)
      return ""
    else
    return result
  }
}
