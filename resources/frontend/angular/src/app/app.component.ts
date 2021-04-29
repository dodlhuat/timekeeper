import {AfterViewInit, Component, QueryList, ViewChildren} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Router} from "@angular/router";
import {MatDrawer} from "@angular/material/sidenav";
import {ToolbarService} from "./toolbar.service";
import {DatabaseService} from "./database.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChildren('mainmenu') public drawers!: QueryList<MatDrawer>;

  constructor(public translate: TranslateService, public router: Router, private toolbarService: ToolbarService, private database: DatabaseService) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');
  }

  public ngAfterViewInit(): void {
    if (this.drawers.get(0) !== undefined) {
      this.toolbarService.setDrawer(this.drawers.get(0)!);
    }
  }

  public logout() {
    this.database.logout();
  }
}
