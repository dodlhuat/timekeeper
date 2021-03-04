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
  public authentication = new BehaviorSubject<{ token: string, code: number }>({token: '', code: 404});

  constructor(private http: HttpClient) {
  }

  public authenticate(email: string, password: string): BehaviorSubject<{ token: string, code: number }> {
    if (localStorage.getItem('userToken') !== null) {
      return this.authenticationCheck(email, password);
    } else {
      return this.doAuth(email, password);
    }
  }

  public doAuth(email: string, password: string) {
    this.http.post<any>(window.location.protocol + "//" + window.location.hostname + ":8000/api/login", {
      email,
      password
    }, this.httpOptions)
      .subscribe(
        data => {
          this.authentication.next({token: data.token, code: 200});
        },
        error => {
          this.authentication.next({token: '', code: 401});
        });
    return this.authentication;
  }

  public authenticationCheck(email: string, password: string): BehaviorSubject<{ token: string, code: number }> {
    if (localStorage.getItem('userToken') !== null) {
      let token = localStorage.getItem('userToken')!;
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', 'Bearer ' + token);
      this.http.get(window.location.protocol + "//" + window.location.hostname + ":8000/api/users/current", this.httpOptions).subscribe(
        user => {
          // already authenticated
          this.authentication.next({token, code: 200});
        },
        error => {
          this.doAuth(email, password);
        }
      );
    }
    return this.authentication;
  }

  public checkToken(): BehaviorSubject<{ token: string, code: number }> {
    if (localStorage.getItem('userToken') !== null) {
      let token = localStorage.getItem('userToken')!;
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', 'Bearer ' + token);
      this.http.get(window.location.protocol + "//" + window.location.hostname + ":8000/api/users/current", this.httpOptions).subscribe(
        user => {
          // already authenticated
          this.authentication.next({token, code: 200});
        },
        error => {
          this.authentication.next({token: '', code: 401});
        }
      );
    } else {
      this.authentication.next({token: '', code: 401});
    }
    return this.authentication;
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
