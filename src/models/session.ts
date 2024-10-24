import { ClassRoom } from "./class-room";

export interface Session {
  sessionId: number;
  unitCount: number;
  startUnit: number;
  subject: string;
  startTime: string;  // Using string to represent time in Angular (format can be adjusted as needed)
  endTime: string;
  wDay: number;
  classRoom?: ClassRoom;
}
