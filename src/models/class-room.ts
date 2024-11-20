import { Session, SessionWithTeacher } from "./session";

export interface ClassRoom {
  roomId: number;
  name: string;
  description?: string;
  stage: number;
  stageSequnce: number;
  floor: string;
  studentsCount: number;
}

export interface ClassRoomWithSessions extends ClassRoom{
  sessions: SessionWithTeacher[]
  currentSubject?:string
  currentTeacher?:string
}
