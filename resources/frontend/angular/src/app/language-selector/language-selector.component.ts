import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

  public languages: string[] = [];
  public selectedLanguage: string = this.translate.currentLang;

  constructor(public translate: TranslateService) { }

  public ngOnInit(): void {
    this.languages = this.translate.getLangs();
    if (!this.selectedLanguage) this.selectedLanguage = 'en';
  }

  public changeLanguage(): void {
    this.translate.use(this.selectedLanguage)
  }
}
