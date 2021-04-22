import { Component, OnInit } from '@angular/core';
import {CalendarService} from "../../calendar.service";
import {MonthName, WeekDay} from "../../shared/global.declarations";

@Component({
  selector: 'app-yearly',
  templateUrl: './yearly.component.html',
  styleUrls: ['./yearly.component.scss']
})
export class YearlyComponent implements OnInit {
  public year: WeekDay[][] = [];
  public monthNames: MonthName[] = [];

  constructor(private calendar: CalendarService) { }

  ngOnInit(): void {
    this.year = this.calendar.getYear();
    this.monthNames = this.calendar.monthNames;
  }

}
