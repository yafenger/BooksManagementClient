import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoryListComponent} from './category-list/category-list.component';
import {BookListComponent} from '../books/book-list/book-list.component';
import { CategoryListResolverService } from '../shared/category-list-resolver.service';

//default route for this module
const routes: Routes = [
  {
    path:'',
    component:CategoryListComponent,
    resolve:{categoryList:CategoryListResolverService}
  },
  {
    path:'books/:id',
    component:BookListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
