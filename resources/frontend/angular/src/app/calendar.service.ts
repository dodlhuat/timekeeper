import { Injectable } from '@angular/core';
import {WeekDay} from "./shared/global.declarations";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }

  public dayNames = [
    {short: 'MO', full: 'Montag'},
    {short: 'DI', full: 'Dienstag'},
    {short: 'MI', full: 'Mittwoch'},
    {short: 'DO', full: 'Donnerstag'},
    {short: 'FR', full: 'Freitag'},
    {short: 'SA', full: 'Samstag'},
    {short: 'SO', full: 'Sonntag'},
  ];

  public getWeek(): WeekDay[] {
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
          year,
          today
        }
      }
    )
    return weekDays;
  }
}
