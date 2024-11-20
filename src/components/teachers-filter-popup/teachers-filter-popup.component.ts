import {Component, inject} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { TeacherFilter, TeacherFilterState } from '../../Types/teacher-filter-state';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-teachers-filter-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teachers-filter-popup.component.html',
  styleUrl: './teachers-filter-popup.component.css'
})
export class TeachersFilterPopupComponent {
  data = inject(MAT_DIALOG_DATA);
  filterState: TeacherFilterState
  dialogRef = inject(MatDialogRef<TeachersFilterPopupComponent>);

  selectedSorting:number=0
  selectedFiltering:number=0
  selectedSortingType:number=0


  constructor(){
    this.filterState=this.data.state

    this.selectedSorting=this.filterState.orderByOption
    this.selectedFiltering=this.filterState.filter
    this.selectedSortingType=this.filterState.sortingType

  }

  closeDialog(): void {

    // console.log(this.filterState)

    // console.log(this.selectedFiltering);
    // console.log(this.selectedSorting);

    this.filterState.filter=this.selectedFiltering
    this.filterState.orderByOption=this.selectedSorting
    this.filterState.sortingType=this.selectedSortingType

    this.dialogRef.close();
  }
}
