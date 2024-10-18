import { Routes } from '@angular/router';
import { TeachersComponent } from '../components/teachers/teachers.component';
import { SessionsComponent } from '../components/sessions/sessions.component';
import { AbsencesComponent } from '../components/absences/absences.component';
import { ClassroomsComponent } from '../components/classrooms/classrooms.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';

export const routes: Routes = [
  {path:"teachers", component:TeachersComponent},
  {path:"absences", component:AbsencesComponent},
  {path:"sessions", component:SessionsComponent},
  {path:"classrooms", component:ClassroomsComponent},
  {path:"", component:TeachersComponent},
  {path:"**", component:NotfoundComponent}

];
