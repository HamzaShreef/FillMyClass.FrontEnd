import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClassRoom } from '../../models/class-room';
import { RoomApiService } from '../../services/room-api.service';

@Component({
  selector: 'app-add-teacher-session-popup',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-teacher-session-popup.component.html',
  styleUrl: './add-teacher-session-popup.component.css'
})
export class AddTeacherSessionPopupComponent implements OnInit{
  subjectName:string = 'علوم أساسية'
  classRooms:ClassRoom[] = []
  slectedRoomId:number | undefined

  constructor(private _roomsApi:RoomApiService){

  }

  addTeacher(){

  }

  ngOnInit(): void {
    this._roomsApi.getAll().subscribe(lst=>{
      this.classRooms=lst
      if(lst.length > 0){
        this.slectedRoomId=lst[0].roomId
      }
    })
  }




}
