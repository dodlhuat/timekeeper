import {Component, OnInit} from '@angular/core';
import {CalendarService} from "../../calendar.service";
import {WeekDay} from "../../shared/global.declarations";

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.scss']
})
export class MonthlyComponent implements OnInit {
  public days: WeekDay[] = [];
  public month: WeekDay[] = [];
  public thisMonth: number = new Date().getMonth() + 1;

  constructor(private calendar: CalendarService) {
  }

  ngOnInit(): void {
    this.days = this.calendar.getWeek();
    this.month = this.calendar.getMonth();
  }

}
