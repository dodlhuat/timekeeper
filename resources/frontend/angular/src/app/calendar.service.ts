import {Injectable} from '@angular/core';
import {DayName, TimeElement, WeekDay} from "./shared/global.declarations";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() {
  }

  public dayNames: DayName[] = [
    {short: 'MO', full: 'Montag', class: 'monday'},
    {short: 'DI', full: 'Dienstag', class: 'tuesday'},
    {short: 'MI', full: 'Mittwoch', class: 'wednesday'},
    {short: 'DO', full: 'Donnerstag', class: 'thursday'},
    {short: 'FR', full: 'Freitag', class: 'friday'},
    {short: 'SA', full: 'Samstag', class: 'saturday'},
    {short: 'SO', full: 'Sonntag', class: 'sunday'},
  ];

  public getWeek(date: string = ''): WeekDay[] {
    const now = new Date();
    const lastDayInThisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const lastDayInLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    // get monday of this week
    let daySubtractor = now.getDay() - 1;
    const dayNumber = now.getDate();
    let weekDays: WeekDay[] = [];
    weekDays = this.dayNames.map(
      (day) => {
        let today = false;
        if (daySubtractor === 0) today = true;
        let number = dayNumber - daySubtractor;
        let year = now.getFullYear();
        let month_number = 0;

        // change days and month accordingly
        if (number > lastDayInThisMonth) {
          // a day is in the next month
          number -= lastDayInThisMonth;
          month_number = now.getMonth() + 2;
        } else if (number < 1) {
          // a day is in the previous month
          number += lastDayInLastMonth;
          month_number = now.getMonth();
        } else {
          month_number = now.getMonth() + 1;
        }
        // switch years if needed
        if (month_number > 12) {
          month_number -= 12;
          year++;
        } else if (month_number < 1) {
          month_number += 12;
          year--;
        }
        daySubtractor--;
        return {
          number,
          month_number,
          name_short: day.short,
          name_full: day.full,
          name_css: day.class,
          year,
          today
        }
      }
    )
    return weekDays;
  }

  public getMonth(date: string = '', fullWeeks: boolean = true): WeekDay[] {
    let now: Date;
    if (date === '') {
      now = new Date();
    } else {
      now = new Date(date);
    }
    let weekDays: WeekDay[] = [];

    const lastDayInThisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const lastDayInLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const firstDayInMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    for (let i = 1; i <= firstDayInMonth.getDay() - 1; i++) {
      weekDays.push(
        {
          month_number: lastDayInLastMonth.getMonth() + 1,
          today: false,
          year: lastDayInLastMonth.getFullYear(),
          name_full: this.dayNames[i - 1].full,
          name_short: this.dayNames[i - 1].short,
          number: lastDayInLastMonth.getDate() - (firstDayInMonth.getDay() - i - 1),
          name_css: this.dayNames[i - 1].class
        }
      )
    }
    let dayNumber = firstDayInMonth.getDay() - 1;
    for (let i = 1; i <= lastDayInThisMonth.getDate(); i++) {
      if (dayNumber >= 28) dayNumber -= 28;
      else if (dayNumber >= 21) dayNumber -= 21;
      else if (dayNumber >= 14) dayNumber -= 14;
      else if (dayNumber >= 7) dayNumber -= 7;
      weekDays.push(
        {
          month_number: lastDayInThisMonth.getMonth() + 1,
          today: now.getDate() === i,
          year: lastDayInThisMonth.getFullYear(),
          name_full: this.dayNames[dayNumber].full,
          name_short: this.dayNames[dayNumber].short,
          number: i,
          name_css: this.dayNames[dayNumber].class
        }
      )
      dayNumber++;
    }
    let nextMonthDay = 1;
    const month_number = (lastDayInThisMonth.getMonth() + 2 > 12) ? 1 : lastDayInThisMonth.getMonth() + 2;
    for (let i = lastDayInThisMonth.getDay(); i < 7; i++) {
      weekDays.push(
        {
          month_number,
          today: false,
          year: month_number === 1 ? lastDayInLastMonth.getFullYear() + 1 : lastDayInLastMonth.getFullYear(),
          name_full: this.dayNames[i].full,
          name_short: this.dayNames[i].short,
          number: nextMonthDay++,
          name_css: this.dayNames[i].class
        }
      )
    }
    return weekDays;
  }

  public setUpDayTime(fullDayTime: TimeElement[]) {
    for (let i = 0; i < 24; i++) {
      const addition = (i < 10) ? '0' : '';
      fullDayTime.push({time: addition + i + ':' + '00', hours: i, minutes: 0});
      fullDayTime.push({time: addition + i + ':' + '30', hours: i, minutes: 30});
    }
    return fullDayTime;
  }
}
