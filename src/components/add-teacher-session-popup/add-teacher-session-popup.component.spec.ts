import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeacherSessionPopupComponent } from './add-teacher-session-popup.component';

describe('AddTeacherSessionPopupComponent', () => {
  let component: AddTeacherSessionPopupComponent;
  let fixture: ComponentFixture<AddTeacherSessionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTeacherSessionPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTeacherSessionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
