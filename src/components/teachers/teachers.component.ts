import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ApiServiceService } from '../../services/api-service.service';
import { CommonModule } from '@angular/common';
import { Teacher } from '../../models/teacher';
import { SessionCountPipe } from '../../pipes/session-count.pipe';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TeachersFilterPopupComponent } from '../teachers-filter-popup/teachers-filter-popup.component';
import { TeacherFilter, TeacherFilterState, TeachersOrderBy, TeacherSortingType } from '../../Types/teacher-filter-state';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule, SearchBarComponent,SessionCountPipe,RouterLink],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent implements OnInit {

  teachersList:Teacher[]=[]
  searchedList:Teacher[]=[]
  filterState: TeacherFilterState
  constructor(private _teachersApi:ApiServiceService,private _filterDialog:MatDialog){
    this.filterState= new TeacherFilterState();
  }


  ngOnInit(): void {
    //the search unit should be a mapping from time to unit
    this._teachersApi.getLiveTeachersInfo().subscribe({
      next:(data)=>{
        this.teachersList=data;
        this.searchedList=data;
      }
    })

  }

  openFilterDialog(){
    this._filterDialog.open(TeachersFilterPopupComponent,{
      data:{
        state: this.filterState
      }
    });

    this._filterDialog.afterAllClosed.subscribe(() => this.refreshState())

  }

  refreshState(){
    if(this.filterState.filter== TeacherFilter.AvailableOnly){

      this.searchedList=this.teachersList.filter(t=>{
       return t.available == true
      })
    }
    else{
      this.searchedList = this.teachersList;
    }

    console.log(this.filterState);

    //Order By AvailableTime
    if(this.filterState.orderByOption == TeachersOrderBy.AvailableTime){
      //Sorting Type
      if(this.filterState.sortingType == TeacherSortingType.Ascending){
        this.searchedList= this.searchedList.sort((t1,t2)=>{
          return t1.unitsAvailable - t2.unitsAvailable;
        })
      }else if(this.filterState.sortingType == TeacherSortingType.Descending){
        this.searchedList= this.searchedList.sort((t1,t2)=>{
          return t2.unitsAvailable - t1.unitsAvailable ;
        })
      }
    }
    //Order By SessionsCount
    else if(this.filterState.orderByOption == TeachersOrderBy.SessionsCount){
      //Order Type
      if(this.filterState.sortingType == TeacherSortingType.Ascending){
        this.searchedList = this.searchedList.sort((t1,t2)=>{
          return t1.weekSessionsCount - t2.weekSessionsCount
        })
      }
      else if(this.filterState.sortingType == TeacherSortingType.Descending){
        this.searchedList = this.searchedList.sort((t1,t2)=>{
          return t2.weekSessionsCount - t1.weekSessionsCount
        })
      }
    }


  }

  filterBySearchQuery(searchQuery: string) {
    this.searchedList = this.teachersList.filter(t => {
      return (t.firstName + t.lastName).toLowerCase().includes(searchQuery.toLowerCase());
    });
  }

}
