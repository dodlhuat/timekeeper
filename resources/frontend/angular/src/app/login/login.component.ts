import {Component, OnInit} from '@angular/core';
import {DatabaseService} from "../database.service";
import {FormControl} from "@angular/forms";

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

  constructor(private database: DatabaseService) {
  }

  public ngOnInit(): void {
    this.database.checkToken().subscribe(
      data => {
        if(data.code == 401) {
          this.globalLoading = false;
        }
      }
    )
  }

  public authenticate(): void {
    this.buttonLoading = true;
    this.database.authenticate(this.username.value, this.password.value).subscribe(
      data => {
        this.buttonLoading = false;
        console.log(data)
        localStorage.setItem('userToken', data.token);
      },
      error => {
        this.buttonLoading = false;
        console.log(error)
      }
    );
  }
}
