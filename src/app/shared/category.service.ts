import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {Category} from '../models/category.model';
import {Book} from '../models/book.model';

@Injectable()
export class CategoryService {
    baseUrl=environment.apiUrl;

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

    constructor(private httpClient: HttpClient) {
    }

    getCategories():Observable<Category[]>{
        return this.httpClient.get<Category[]>(this.baseUrl+'/categories')
                   .pipe(catchError(this.handleError));
    }

    getCategory(id:string):Observable<Category>{
        return this.httpClient.get<Category>(this.baseUrl+'/categories/'+id)
                   .pipe(catchError(this.handleError));       
    }

    addCategory(category:Category):Observable<Category>{
        return this.httpClient.post<Category>(this.baseUrl+'/categories',category,this.httpOptions)
                   .pipe(catchError(this.handleError));
    }

    getBooksByCategory(id:string):Observable<Book[]>{
        return this.httpClient.get<Book[]>(this.baseUrl+'/categories/books/'+id)
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
    


