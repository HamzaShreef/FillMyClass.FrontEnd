import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClassRoom } from '../../models/class-room';
import { RoomApiService } from '../../services/room-api.service';
import { SessionApiService } from '../../services/session-api.service';
import {
  AddedSessionReport,
  AddSessionDTO,
  AddSessionWindowConfig,
} from '../../models/add-session-dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-teacher-session-popup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-teacher-session-popup.component.html',
  styleUrl: './add-teacher-session-popup.component.css',
})
export class AddTeacherSessionPopupComponent implements OnInit {
  // subjectName: string = '';
  // slectedRoomId: number = 0;
  // selectedWeekDay: number = 0;
  // selectedStartUnit: number = 1;
  teacherId: number = 0;
  submittingData: boolean = false;

  selectionsConfig: AddSessionWindowConfig;

  //errorMessageVariable
  errorMessage: string = '';

  //passed data
  data = inject(MAT_DIALOG_DATA);

  constructor(
    private _roomsApi: RoomApiService,
    private _sessionsApi: SessionApiService,
    private _dialogRef: MatDialogRef<AddTeacherSessionPopupComponent>
  ) {
    this.selectionsConfig = this.data.windowOptions as AddSessionWindowConfig;
  }

  addSession() {
    this.submittingData = true;
    let newSession: AddSessionDTO = {
      teacherId: this.teacherId,
      roomId: this.selectionsConfig.selectedRoomId,
      subject: this.selectionsConfig.subjectName,
      weekDay: this.selectionsConfig.selectedWeekDay,
      startUnit: this.selectionsConfig.selectedStartUnit,
    };

    let sessionAddResult = this._sessionsApi.addSession(newSession);
    sessionAddResult.subscribe((res) => {
      if (!res.isSucceeded) {
        this.errorMessage = res.errorMessage;
        this.submittingData = false;
      } else {
        //close the popup and report to the calling component

        let selectedRoomName = this.selectionsConfig.roomsList.find(
          (r) => r.roomId == this.selectionsConfig.selectedRoomId
        )?.name;

        let addedSessionReport: AddedSessionReport = {
          roomId: newSession.roomId,
          teacherId: newSession.teacherId,
          subject: newSession.subject,
          startUnit: newSession.startUnit,
          weekDay: newSession.weekDay,
          roomName: selectedRoomName ?? '',
        };

        this._dialogRef.close(addedSessionReport);
      }
    });
  }

  ngOnInit(): void {
    this.teacherId = this.data.teacherInfo.teacherId;

    if (this.selectionsConfig.roomsList.length === 0) {
      this._roomsApi.getAll().subscribe((lst) => {
        this.selectionsConfig.roomsList = lst;
        if (this.selectionsConfig.selectedRoomId == 0 && lst.length > 0) {
          this.selectionsConfig.selectedRoomId = lst[0].roomId;
        }
      });
    }
  }

  clearErrors() {
    this.errorMessage = '';
  }
}
