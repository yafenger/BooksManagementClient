import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { BooksRoutingModule } from './books-routing.module';
import { BookCreateComponent } from './book-create/book-create.component';
import {SharedModule} from '../shared/shared.module';
import { MatDialogModule} from '@angular/material';
import { BookDeleteComponent } from './book-delete/book-delete.component';
import {CreateBookCanDeactivateGuardService} from '../books/create-book-can-deactivate-guard.service';


@NgModule({
  declarations: [
    BookCreateComponent,
    BookDeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BooksRoutingModule,
    SharedModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
  ],
  providers:[CreateBookCanDeactivateGuardService],
  entryComponents:[
    BookDeleteComponent
  ],
})
export class BooksModule { }