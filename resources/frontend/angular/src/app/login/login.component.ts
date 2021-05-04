import {Component, OnInit} from '@angular/core';
import {DatabaseService} from "../database.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {transition, trigger, useAnimation} from "@angular/animations";
import {bounceIn} from "ng-animate";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('bounceIn', [transition('* => *', useAnimation(bounceIn))])
  ]
})
export class LoginComponent implements OnInit {
  public buttonLoading = false;
  public globalLoading = true;

  public loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  public bounceIn: any;
  private logInAttempted = false;

  constructor(private database: DatabaseService, private router: Router) {
  }

  public ngOnInit(): void {
    this.database.authentication.subscribe(
      data => {
        this.buttonLoading = false;
        if (data.code === 200) {
          localStorage.setItem('userToken', data.token);
          this.router.navigate(['/calendar']);
        } else if ((data.code === 404) || (this.logInAttempted && data.code === 401)) {
          this.loginForm.setErrors({});
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
    this.logInAttempted = true;
    this.buttonLoading = true;
    this.database.authenticate(this.loginForm.controls.username.value, this.loginForm.controls.password.value);
  }
}
