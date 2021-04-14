import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ToolbarService} from "../toolbar.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public router: Router, private toolbarService: ToolbarService) { }

  public ngOnInit(): void {
  }

  public toggleMenu() {
    console.log('toggle menu');
    this.toolbarService.toggle();
  }
}
