import {Component, Input, OnInit} from '@angular/core';
import {CalendarService} from "../calendar.service";
import {WeekDay} from "../shared/global.declarations";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  public days: WeekDay[] = [];

  constructor(private calendar: CalendarService) {}

  ngOnInit(): void {
    this.days = this.calendar.getWeek();
  }
}
