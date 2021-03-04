import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public translate: TranslateService, public router: Router) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');
  }
  title = 'angular';
}
