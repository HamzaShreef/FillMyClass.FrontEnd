import { Session } from "./session";

export interface Teacher {
  schoolId: number;
  teacherId: number;
  firstName: string;
  lastName: string;
  speciality: string;
  maleGender: boolean;
  phone?: string;
  isExternal: boolean;
  weekSessionsCount: number;
  sessions: Session[];
  available:boolean;
  unitsAvailable:number;
  classRoomAt?:string;
  roomStageAt?:number;
  subjectAt?:string;
}
