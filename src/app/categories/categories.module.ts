import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
//import {BookListComponent} from '../books/book-list/book-list.component';
//import {CategoryService} from '../shared/category.service';
import {SharedModule} from '../shared/shared.module';

//material part for this module
import { MatDialogModule,MatInputModule } from '@angular/material';



@NgModule({
  declarations: [
    CategoryListComponent, 
    CategoryCreateComponent,
    //BookListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CategoriesRoutingModule,
    MatDialogModule,
    MatInputModule,
    SharedModule
  ],
  entryComponents:[
    CategoryCreateComponent
  ],
  providers:[]
})
export class CategoriesModule { }
