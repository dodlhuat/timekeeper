import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Router} from "@angular/router";
import {MatDrawer} from "@angular/material/sidenav";
import {ToolbarService} from "./toolbar.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('mainmenu') public drawer!: MatDrawer;

  constructor(public translate: TranslateService, public router: Router, private toolbarService: ToolbarService) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');
  }

  public ngAfterViewInit(): void {
    this.toolbarService.setDrawer(this.drawer);
  }
}
