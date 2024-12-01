import { ClassRoom } from './class-room';

export interface AddSessionDTO {
  teacherId: number;
  roomId: number;
  subject: string;
  weekDay: number;
  startUnit: number;
}

export interface AddedSessionReport extends AddSessionDTO {
  roomName: string;
}

export interface SessionResponse {
  sessionId: number;
  startUnit: number;
  subject: string;
  weekDay: number;
}

export interface AddSessionResult {
  isSucceeded: boolean;
  errorMessage: string;
}

export interface AddSessionWindowConfig {
  selectedRoomId: number;
  selectedWeekDay: number;
  selectedStartUnit: number;
  subjectName: string;
  roomsList: ClassRoom[];
}
