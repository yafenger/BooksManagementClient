import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Book } from '../models/book.model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { BookService } from './book.service';

@Injectable()

export class BookListResolverService implements Resolve<Book[]> {   
    constructor(private _bookService: BookService) {
    }
    // Resolve interface contains the following one method for which we need to
    // provide implementation. 
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book[]> {
        return this._bookService.getBooks();
    }
}