import {Injectable} from '@angular/core';
import {DayName, MonthName, TimeElement, WeekDay} from "./shared/global.declarations";

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

  public monthNames: MonthName[] = [
    {short: 'JAN', full: 'Jänner', number: 1},
    {short: 'FEB', full: 'Februar', number: 2},
    {short: 'MAR', full: 'März', number: 3},
    {short: 'APR', full: 'April', number: 4},
    {short: 'MAI', full: 'Mai', number: 5},
    {short: 'JUN', full: 'Juni', number: 6},
    {short: 'JUL', full: 'Juli', number: 7},
    {short: 'AUG', full: 'August', number: 8},
    {short: 'SEP', full: 'September', number: 9},
    {short: 'OKT', full: 'Oktober', number: 10},
    {short: 'NOV', full: 'November', number: 11},
    {short: 'DEZ', full: 'Dezember', number: 12},
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
    const today: Date = new Date();
    if (date === '') {
      now = new Date();
    } else {
      now = new Date(date);
    }
    let weekDays: WeekDay[] = [];

    const lastDayInThisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const lastDayInLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const firstDayInMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    if (fullWeeks) {
      for (let i = 1; i <= this.reIndexDay(firstDayInMonth.getDay()); i++) {
        weekDays.push(
          {
            month_number: lastDayInLastMonth.getMonth() + 1,
            today: false,
            year: lastDayInLastMonth.getFullYear(),
            name_full: this.dayNames[i - 1].full,
            name_short: this.dayNames[i - 1].short,
            number: lastDayInLastMonth.getDate() - (this.reIndexDay(firstDayInMonth.getDay()) - i),
            name_css: this.dayNames[i - 1].class
          }
        )
      }
    }
    let dayNumber = this.reIndexDay(firstDayInMonth.getDay());
    for (let i = 1; i <= lastDayInThisMonth.getDate(); i++) {
      if (dayNumber >= 28) dayNumber -= 28;
      else if (dayNumber >= 21) dayNumber -= 21;
      else if (dayNumber >= 14) dayNumber -= 14;
      else if (dayNumber >= 7) dayNumber -= 7;
      weekDays.push(
        {
          month_number: lastDayInThisMonth.getMonth() + 1,
          today: today.getDate() === i && today.getMonth() === now.getMonth(),
          year: lastDayInThisMonth.getFullYear(),
          name_full: this.dayNames[dayNumber].full,
          name_short: this.dayNames[dayNumber].short,
          number: i,
          name_css: this.dayNames[dayNumber].class
        }
      )
      dayNumber++;
    }
    if (fullWeeks) {
      let nextMonthDay = 1;
      const month_number = (lastDayInThisMonth.getMonth() + 2 > 12) ? 1 : lastDayInThisMonth.getMonth() + 2;
      for (let i = this.reIndexDay(lastDayInThisMonth.getDay()) + 1; i < 7; i++) {
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
    }
    return weekDays;
  }

  public getYear(): WeekDay[][] {
    const now = new Date();
    let year: WeekDay[][] = [];
    for (let i = 1; i <= 12; i++) {
      const month = this.getMonth(this.pad(i) + '-' + '01-' + now.getFullYear(), false);
      year[month[0].month_number] = month;
    }
    return year.filter((item) => item !== undefined);
  }

  public setUpDayTime(fullDayTime: TimeElement[]) {
    for (let i = 0; i < 24; i++) {
      const addition = (i < 10) ? '0' : '';
      fullDayTime.push({time: addition + i + ':' + '00', hours: i, minutes: 0});
      fullDayTime.push({time: addition + i + ':' + '30', hours: i, minutes: 30});
    }
    return fullDayTime;
  }

  private pad(num: number, size: number = 2): string {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  /**
   * Re Index Day
   *
   * as days in javascript start with 0 as sunday, reindexing is needed
   *
   * @param dayNumber
   * @private
   */
  private reIndexDay(dayNumber: number): number {
    if (dayNumber === 0) return 7;
    return dayNumber - 1;
  }
}
