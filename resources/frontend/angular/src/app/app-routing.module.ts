import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {CalendarComponent} from "./calendar/calendar.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'login', component: LoginComponent},
  // wildcard for all other pages
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
