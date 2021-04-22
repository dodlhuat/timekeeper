import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {WeeklyComponent} from "./calendar/weekly/weekly.component";
import {MonthlyComponent} from "./calendar/monthly/monthly.component";
import {YearlyComponent} from "./calendar/yearly/yearly.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'calendar', component: WeeklyComponent},
  {path: 'login', component: LoginComponent},
  {path: 'calendar/weekly', component: WeeklyComponent},
  {path: 'calendar/monthly', component: MonthlyComponent},
  {path: 'calendar/yearly', component: YearlyComponent},
  // wildcard for all other pages
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
