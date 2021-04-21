import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCalendarEntryComponent } from './add-calendar-entry.component';

describe('AddCalendarEntryComponent', () => {
  let component: AddCalendarEntryComponent;
  let fixture: ComponentFixture<AddCalendarEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCalendarEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCalendarEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
