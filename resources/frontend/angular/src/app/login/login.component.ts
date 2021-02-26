import {Component, OnInit} from '@angular/core';
import {DatabaseService} from "../database.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public buttonLoading = false;

  constructor(private database: DatabaseService) {
  }

  public ngOnInit(): void {
  }

  public authenticate(): void {
    this.buttonLoading = true;
    // todo: try to use local storage data beforehands localStorage.getItem('userToken')
    if (localStorage.getItem('userToken') !== null) {
      this.database.getModel('User', {id: 1});
    } else {
      // TODO: the if needs to be removed
      this.database.authenticate('abauer@asqs.net', 'andib81').subscribe(
        data => {
          this.buttonLoading = false;
          localStorage.setItem('userToken', data.token);
        },
        error => console.log(error)
      );
    }
  }
}
