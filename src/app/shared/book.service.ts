import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {Book} from '../models/book.model'
@Injectable()
export class BookService {

  baseUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };


  constructor(private httpClient: HttpClient) {
  }

  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.baseUrl + '/books')
      .pipe(catchError(this.handleError));
  }

  getBook(id:string):Observable<Book>{
    return this.httpClient.get<Book>(this.baseUrl+'/books/'+id)
    .pipe(catchError(this.handleError));
  }

  addBook(book:Book):Observable<Book>{
    return this.httpClient.post<Book>(this.baseUrl+'/books',book,this.httpOptions)
                   .pipe(catchError(this.handleError));

  }

  updateBook(book:Book):Observable<void>{
    return this.httpClient.put<void>(this.baseUrl+'/books/'+book._id,book,this.httpOptions)
               .pipe(catchError(this.handleError));
  }

  deleteBook(id:string):Observable<void>{
    console.log("deleteUrL",this.baseUrl+'/books/'+id)
    return this.httpClient.delete<void>(this.baseUrl+'/books/'+id)
            .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }


}
