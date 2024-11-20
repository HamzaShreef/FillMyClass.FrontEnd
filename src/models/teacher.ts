import { Session, SessionWithRoom } from "./session";

export interface TeacherBasic{
  teacherId: number;
  firstName: string;
  lastName: string;
  speciality: string;
  phone?: string;
}

export interface Teacher extends TeacherBasic {
  maleGender: boolean;
  isExternal: boolean;
  weekSessionsCount: number;
  sessions: SessionWithRoom[];
  available:boolean;
  unitsAvailable:number;
  classRoomAt?:string;
  roomStageAt?:number;
  subjectAt?:string;
}
