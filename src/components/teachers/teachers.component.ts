import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ApiServiceService } from '../../services/api-service.service';
import { CommonModule } from '@angular/common';
import { Teacher } from '../../models/teacher';
import { SessionCountPipe } from '../../pipes/session-count.pipe';
import { RoomStagePipe } from '../../pipes/room-stage.pipe';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule, SearchBarComponent,SessionCountPipe,RoomStagePipe],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent implements OnInit {

  teachersList:Teacher[]=[]
  searchedList:Teacher[]=[]
  constructor(private _teachersApi:ApiServiceService){
  }


  ngOnInit(): void {
    let searchUnit = 2;
    //the search unit should be a mapping from time to unit
    this._teachersApi.getLiveTeacherInfo(searchUnit).subscribe({
      next:(data)=>{
        this.teachersList=data;
        this.searchedList=data;
      }
    })

  }

  filterBySearchQuery(searchQuery: string) {
    this.searchedList = this.teachersList.filter(t => {
      return (t.firstName + t.lastName).toLowerCase().includes(searchQuery.toLowerCase());
    });
  }

}
