import {Component, Input, OnInit} from '@angular/core';
import {CalendarService} from "../calendar.service";
import {WeekDay} from "../shared/global.declarations";
import {DatabaseService} from "../database.service";
import {User} from "../shared/user.model";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  public days: WeekDay[] = [];
  public hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

  constructor(private calendar: CalendarService, private database: DatabaseService) {}

  ngOnInit(): void {
    this.days = this.calendar.getWeek();

    this.database.get<User>(User).subscribe((users) => {
      console.log(users);
    });
  }
}
