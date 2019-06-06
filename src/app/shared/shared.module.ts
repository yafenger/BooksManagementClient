import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';   
import {BookListComponent} from '../books/book-list/book-list.component';

@NgModule({
  declarations: [
    BookListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports:[
    BookListComponent
  ]
})
export class SharedModule { }
