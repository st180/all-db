import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { User } from './User';

@Injectable({
  providedIn: 'root'
})

export class ReadwriteService {

  constructor(private httpClient: HttpClient) { }

  REST_API: string = 'http://localhost:9200';

  readData(): Observable<any> {
    return this.httpClient.get(`${this.REST_API}/elasticsearch-users`);
  }

  deleteItem(id: any): Observable<any> {
    return this.httpClient.delete(`${this.REST_API}/elasticsearch-users/${id}`);
  }

  writeUser(data: User): Observable<any> {
    return this.httpClient.post(`${this.REST_API}/elasticsearch-users`, data);
  }

}
  /*
  // Node/Express API
  //
  // Add


  // Get all objects

  // Get single object
  GetUser(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/read-user/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
      //  catchError(this.handleError)
      )
  }
  // Update
  updateUser(id:any, data:any): Observable<any> {
    let API_URL = `${this.REST_API}/update-user/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
      //  catchError(this.handleError)
      )
  }
  // Delete
  deleteUser(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-user/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
      //  catchError(this.handleError)
      )
  }
  // Error

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  */
