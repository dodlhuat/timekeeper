import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TimeElement, WeekDay} from "../../shared/global.declarations";

@Component({
  selector: 'app-add-calendar-entry',
  templateUrl: './add-calendar-entry.component.html',
  styleUrls: ['./add-calendar-entry.component.scss']
})
export class AddCalendarEntryComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { hour: TimeElement, day: WeekDay }) {
  }

  public ngOnInit(): void {
    console.log(this.data);
  }

}
