import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Teacher } from '../../models/teacher';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../../services/api-service.service';
import { RoomStagePipe } from '../../pipes/room-stage.pipe';
import { PhoneNumberPipe } from '../../pipes/phone-number.pipe';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddTeacherSessionPopupComponent } from '../add-teacher-session-popup/add-teacher-session-popup.component';
import {
  AddedSessionReport,
  AddSessionDTO,
  AddSessionWindowConfig,
} from '../../models/add-session-dto';

@Component({
  selector: 'app-teacher-details',
  standalone: true,
  imports: [CommonModule, RoomStagePipe, PhoneNumberPipe],
  templateUrl: './teacher-details.component.html',
  styleUrl: './teacher-details.component.css',
})
export class TeacherDetailsComponent implements OnInit {
  windowConfig: AddSessionWindowConfig = {
    selectedRoomId: 0,
    selectedStartUnit: 1,
    selectedWeekDay: 0,
    subjectName: '',
    roomsList: [],
  };
  teacher: Teacher | undefined;
  isLoading: boolean = true;

  @ViewChild('tableBody', { static: false }) tableBody!: ElementRef;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _apiService: ApiServiceService,
    private _addSessionDialog: MatDialog
  ) {}

  modifyCell(row: number, column: number, newValue: string) {
    console.log(`row in modifyCell: ${row}`);

    row++;
    column = 8 - column;
    column = column - 1;

    console.log(`row: ${row}`);
    console.log(`column: ${column}`);

    const rows = this.tableBody.nativeElement.rows; // Get all rows
    const cell = rows[row].cells[column]; // Access specific cell

    //console.log(`rows: ${rows}`);

    cell.textContent = newValue; // Replace cell text

    // Apply styles to distinguish the newly added cell
    cell.style.color = 'yellow'; // Change text color
    cell.style.backgroundColor = 'blue'; // Add background color
    cell.style.fontWeight = 'bold'; // Make the text bold
    cell.style.transition = 'background-color 0.5s ease'; // Add smooth transition
  }

  ngOnInit(): void {
    let teacherId = Number(this._activatedRoute.snapshot.paramMap.get('id'));
    this._apiService.getTeacherLiveInfo(teacherId).subscribe((teacherInfo) => {
      if (teacherInfo == undefined) {
        this._router.navigateByUrl('notfound');
      }

      this.teacher = teacherInfo;
      this.isLoading = false;

      console.log(this.teacher);
    });
  }

  addSession() {
    let dialogRef = this._addSessionDialog.open(
      AddTeacherSessionPopupComponent,
      {
        data: {
          teacherInfo: this.teacher,
          windowOptions: this.windowConfig,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Session created successfully:', result);
        let addedSession = result as AddedSessionReport;

        console.log(`weekDay: ${addedSession.weekDay}`);

        this.modifyCell(
          addedSession.weekDay,
          addedSession.startUnit,
          addedSession.roomName
        );
        // Handle the returned session object here (e.g., add to a list)
      } else {
        console.log('Popup closed without adding a session.');
      }
    });
  }

  editSession() {}

  deleteSession() {}

  getSession(wDay: number, sessionUnit: number) {
    let result;
    let currSession = this.teacher?.sessions.find(
      (s) => s.weekDay == wDay && s.startUnit == sessionUnit
    );
    if (currSession != undefined) {
      result = currSession.classRoom?.name;
    }

    if (sessionUnit == 7) {
      wDay = wDay + 1;
      sessionUnit = 0;
    }

    sessionUnit = sessionUnit + 1;

    // console.log("weekday");
    // console.log(wDay);
    // console.log("startUnit");
    // console.log(sessionUnit);
    // console.log("room");
    // console.log(currSession?.classRoom?.name);

    if (result == undefined) return '';
    else return result;
  }
}
