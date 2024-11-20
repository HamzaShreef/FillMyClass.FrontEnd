import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersFilterPopupComponent } from './teachers-filter-popup.component';

describe('TeachersFilterPopupComponent', () => {
  let component: TeachersFilterPopupComponent;
  let fixture: ComponentFixture<TeachersFilterPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeachersFilterPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeachersFilterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
