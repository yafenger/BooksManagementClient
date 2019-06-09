import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';   
import {BookListComponent} from '../books/book-list/book-list.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    BookListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule
  ],
  exports:[
    BookListComponent
  ]
})
export class SharedModule { }
