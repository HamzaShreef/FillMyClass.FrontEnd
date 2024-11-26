import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { ClassRoomWithSessions } from '../../models/class-room';
import { RoomStagePipe } from '../../pipes/room-stage.pipe';
import { RoomApiService } from '../../services/room-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-classrooms',
  standalone: true,
  imports: [RoomStagePipe, CommonModule],
  templateUrl: './classrooms.component.html',
  styleUrl: './classrooms.component.css'
})
export class ClassroomsComponent implements OnInit{
  roomsList!: ClassRoomWithSessions[]
  isLoading:boolean=true

  constructor(private _roomService:RoomApiService){

  }


  ngOnInit(): void {

    // this._roomService.getLiveRoomsInfo(1).subscribe(lst => {
    //   this.roomsList=lst
    // })

    this._roomService.getRoomsInfo(1,1).subscribe(rooms=>{
      console.log(rooms);

      this.roomsList=rooms;
      this.isLoading=false
    })
  }



}
