import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CalendarService} from "../calendar.service";
import {TimeElement, WeekDay} from "../shared/global.declarations";
import {DatabaseService} from "../database.service";
import {User} from "../shared/user.model";
import {MatDialog} from "@angular/material/dialog";
import {AddCalendarEntryComponent} from "../modals/add-calendar-entry/add-calendar-entry.component";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit, AfterViewInit {
  public days: WeekDay[] = [];
  public scrollBarWidth = 0;
  public fullDayTime: TimeElement[] = [];
  @ViewChild('scrollingcontainer') scrollElement!: ElementRef;

  constructor(private calendar: CalendarService, private database: DatabaseService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.setUpDayTime();
    this.days = this.calendar.getWeek();
    this.measureScrollbarWidth();

    // TODO: this is only testing output!!!
    this.database.get<User>(User, {filter: {id: 1}, include: ['tracked-working-times']}).subscribe((users) => {
      users.map(
        (user) => {
          console.log(user);
          user["user-roles"]?.map(
            (userrole) => {
              console.log(userrole);
            }
          )
        }
      )
    });
  }

  private measureScrollbarWidth() {
    // Add temporary box to wrapper
    let scrollbox = document.createElement('div');
    // Make box scrollable
    scrollbox.style.overflow = 'scroll';
    // Append box to document
    document.body.appendChild(scrollbox);
    // Measure inner width of box
    this.scrollBarWidth = scrollbox.offsetWidth - scrollbox.clientWidth;
    // Remove box
    document.body.removeChild(scrollbox);
  }

  get scrollBarWidthInPx() {
    return this.scrollBarWidth + 'px';
  }

  ngAfterViewInit(): void {
    this.scrollElement.nativeElement.scroll({
      top: 250
    });
  }

  private setUpDayTime() {
    for (let i = 0; i < 24; i++) {
      const addition = (i < 10) ? '0' : '';
      this.fullDayTime.push({time: addition + i + ':' + '00', hours: i, minutes: 0});
      this.fullDayTime.push({time: addition + i + ':' + '30', hours: i, minutes: 30});
    }
  }

  public showAddEntryModal() {
    const dialogRef = this.dialog.open(AddCalendarEntryComponent, {
      width: '250px',
      data: {name: 'eins'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
