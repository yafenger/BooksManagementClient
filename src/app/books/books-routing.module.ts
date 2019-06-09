import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookListComponent} from './book-list/book-list.component';
import {BookCreateComponent} from './book-create/book-create.component';
import { BookListResolverService } from '../shared/book-list-resolver.service';
import {CreateBookCanDeactivateGuardService} from './create-book-can-deactivate-guard.service';

//default route for this module
const routes: Routes = [
  {
    path:'',
    component:BookListComponent,
    resolve:{bookList:BookListResolverService}
  },
  {
    path:'edit/:id',
    component:BookCreateComponent
  },
  {
    path:'create',
    component:BookCreateComponent,
    canDeactivate:[CreateBookCanDeactivateGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
