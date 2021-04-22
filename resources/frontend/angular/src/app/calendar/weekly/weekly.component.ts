import {Component, OnInit} from '@angular/core';
import {CalendarService} from "../../calendar.service";
import {TimeElement, WeekDay} from "../../shared/global.declarations";
import {AddCalendarEntryComponent} from "../../modals/add-calendar-entry/add-calendar-entry.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.scss']
})
export class WeeklyComponent implements OnInit {
  public days: WeekDay[] = [];
  public fullDayTime: TimeElement[] = [];

  constructor(private calendar: CalendarService, public dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.days = this.calendar.getWeek();
    this.fullDayTime = this.calendar.setUpDayTime(this.fullDayTime);
  }

  public showAddEntryModal(hour: TimeElement, day: WeekDay) {
    const dialogRef = this.dialog.open(AddCalendarEntryComponent, {
      width: '250px',
      data: {
        hour, day
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
