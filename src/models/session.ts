import { ClassRoom } from "./class-room";
import { Teacher, TeacherBasic } from "./teacher";

export interface Session {
  sessionId: number;
  startUnit: number;
  subject: string;
  weekDay: number;
}

export interface SessionWithRoom extends Session{
  classRoom?: ClassRoom;
}

export interface SessionWithTeacher extends Session{
  teacher:TeacherBasic
}
