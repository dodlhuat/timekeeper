import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "./shared/user.model";
import {Observable} from "rxjs";

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

  constructor(private http: HttpClient) { }

  public authenticate(email: string, password: string): Observable<any> {
    return this.http.post<any>(window.location.protocol + "//" + window.location.hostname + ":8000/api/login", {email, password}, this.httpOptions)
  }

  public authenticationCheck(): boolean {

    return true;
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

  private getAPIEndpoint(model: string, params?: {id: number}): string {
    // todo: das muss irgendwie besser gehen
    let endpoint = '';
    if (model === 'User') {
      endpoint += 'users'
      if (params && params.id) endpoint += '/' + params.id;
    }
    return endpoint;
  }
}
