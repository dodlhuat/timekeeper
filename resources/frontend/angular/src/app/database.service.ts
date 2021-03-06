import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {ApiModel, modelEndpoints, ModelType, SearchParameters} from "./shared/global.declarations";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

export type ApiResponse = {
  data: [] | {}
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  public authentication = new BehaviorSubject<{ token: string, code: number }>({code: 404, token: ''});

  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * Authenticate
   *
   * @param email
   * @param password
   */
  public authenticate(email: string, password: string) {
    this.http.post<{ token: string }>(window.location.protocol + "//" + window.location.hostname + ":8000/api/login", {
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

  /**
   * Check If Authenticated
   */
  public checkIfAuthenticated() {
    if (localStorage.getItem('userToken') !== null) {
      let token = localStorage.getItem('userToken')!;
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', 'Bearer ' + token);
      this.http.get<{ valid: boolean }>(window.location.protocol + "//" + window.location.hostname + ":8000/api/token-check", this.httpOptions).subscribe(
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

  /**
   * Get
   *
   * load a given model with optional parameters
   *
   * @param model
   * @param params
   */
  public get<T extends ApiModel>(model: ModelType<T>, params?: SearchParameters) {
    let token = localStorage.getItem('userToken');
    this.httpOptions.headers = this.httpOptions.headers.append('Authorization', 'Bearer ' + token);
    const additionalParams = DatabaseService.getAPIParameters(params);
    let parameters = {
      ...this.httpOptions,
      params: additionalParams
    }
    return this.http.get(DatabaseService.getAPIEndpoint(model.name, params), parameters).pipe(
      map((data) => {
        const apiResponse = data as ApiResponse;
        return this.convertToModel(apiResponse, model)
      })
    )
  }

  private static getAPIEndpoint(model: string, params?: SearchParameters): string {
    let endpoint = modelEndpoints[model.toLowerCase()];
    if (params && params.filter && params.filter.id) endpoint += '/' + params.filter.id;
    return window.location.protocol + "//" + window.location.hostname + ":8000/api/" + endpoint;
  }

  private static getAPIParameters(params: SearchParameters | undefined): {} | { include: string } {
    if (params && params.include) {
      return {include: params.include.join(',')}
    }
    return {};
  }

  private convertToModel<T extends ApiModel>(response: ApiResponse, model: ModelType<T>) {
    // array of objects
    const responseArray: {}[] = (Array.isArray(response.data)) ? response.data : [response.data];
    return responseArray.map(
      (modelData: { [key: string]: string }) => {

        let responseData: { [key: string]: string | [] } = {};
        for (const k in modelData) {
          if (typeof modelData[k] === 'object' && modelData[k] !== null) {
            // these are includes
            // @ts-ignore
            let includes = modelData[k] as { data: [] };
            responseData[k] = includes.data;
          } else {
            responseData[k] = modelData[k];
          }
        }
        // needs to be converted to unknown first
        return responseData as unknown as T;
      }
    )
  }

  public logout() {
    let token = localStorage.getItem('userToken')!;
    this.httpOptions.headers = this.httpOptions.headers.append('Authorization', 'Bearer ' + token);
    this.http.post<{ logged_out: boolean }>(
      window.location.protocol + "//" + window.location.hostname + ":8000/api/users/logout",
      {},
      this.httpOptions
    ).subscribe(
      (data) => {
        this.router.navigate(['/login']);
      }
    );
  }
}
