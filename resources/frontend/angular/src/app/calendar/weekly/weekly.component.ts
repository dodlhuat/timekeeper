import {Component, OnInit} from '@angular/core';
import {CalendarService} from "../../calendar.service";
import {TimeElement, WeekDay} from "../../shared/global.declarations";

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.scss']
})
export class WeeklyComponent implements OnInit {
  public days: WeekDay[] = [];
  public fullDayTime: TimeElement[] = [];

  constructor(private calendar: CalendarService) {
  }

  ngOnInit(): void {
    this.days = this.calendar.getWeek();
    this.fullDayTime = this.calendar.setUpDayTime(this.fullDayTime);
  }

}
