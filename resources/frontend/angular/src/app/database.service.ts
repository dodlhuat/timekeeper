import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "./shared/user.model";
import {BehaviorSubject, Observable, Subscription} from "rxjs";

// TODO: move to file
class SearchParameters {
  public id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  public authentication = new BehaviorSubject<{ token: string, code: number }>({code: 404, token: ''});

  constructor(private http: HttpClient) {
  }

  public authenticate(email: string, password: string) {
    this.http.post<{token: string}>(window.location.protocol + "//" + window.location.hostname + ":8000/api/login", {
      email,
      password
    }, this.httpOptions)
      .subscribe(
        data => {
          localStorage.setItem('userToken', data.token);
          this.authentication.next({code: 200, token: data.token});
        },
        error => {
          this.authentication.next({code: 401, token: ''});
        });
  }

  public checkIfAuthenticated() {
    if (localStorage.getItem('userToken') !== null) {
      let token = localStorage.getItem('userToken')!;
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', 'Bearer ' + token);
      this.http.get<{valid: boolean}>(window.location.protocol + "//" + window.location.hostname + ":8000/api/token-check", this.httpOptions).subscribe(
        (data) => {
          if (data.valid) {
            this.authentication.next({code: 200, token: token});
          } else {
            this.authentication.next({code: 401, token: ''});
          }
        }
      )
    } else {
      this.authentication.next({code: 401, token: ''});
    }
  }

  public getModel(model: any, params?: SearchParameters) {
    // get
    let token = localStorage.getItem('userToken');
    let parameters = {
      ...this.httpOptions,
      ...params,
      token
    }
    this.http.get(window.location.protocol + "//" + window.location.hostname + ":8000/api/" + this.getAPIEndpoint(model, {id: 1}), parameters).subscribe(
      user => console.log(user)
    );
  }

  private getAPIEndpoint(model: string, params?: { id: number }): string {
    // todo: das muss irgendwie besser gehen
    let endpoint = '';
    if (model === 'User') {
      endpoint += 'users'
      if (params && params.id) endpoint += '/' + params.id;
    }
    return endpoint;
  }
}
