import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Category } from '../models/category.model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { CategoryService } from './category.service';

@Injectable()

export class CategoryListResolverService implements Resolve<Category[]> {   
    constructor(private _categoryService: CategoryService) {
    }
    // Resolve interface contains the following one method for which we need to
    // provide implementation. 
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
        return this._categoryService.getCategories();
    }
}