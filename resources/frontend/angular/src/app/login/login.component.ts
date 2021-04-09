import {Component, OnInit} from '@angular/core';
import {DatabaseService} from "../database.service";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public buttonLoading = false;
  public globalLoading = true;

  public username = new FormControl('');
  public password = new FormControl('');

  constructor(private database: DatabaseService, private router: Router) {
  }

  public ngOnInit(): void {
    this.database.authentication.subscribe(
      data => {
        this.buttonLoading = false;
        if (data.code === 200) {
          localStorage.setItem('userToken', data.token);
          this.router.navigate(['/calendar']);
        } else if (data.code === 404) {
          // 404 is when no check has done so far
          if (this.username.dirty) {
            this.username.setErrors({});
            this.password.setErrors({});
          }
        } else {
          this.globalLoading = false;
        }
      },
      error => {
        this.buttonLoading = false;
        console.log(error)
      }
    );
    this.database.checkIfAuthenticated();
  }

  public authenticate(): void {
    this.buttonLoading = true;
    this.database.authenticate(this.username.value, this.password.value);
  }
}
