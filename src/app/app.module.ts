import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


//Material 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//Routing
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {BookService} from './shared/book.service';
import {CategoryService} from './shared/category.service';
import {CategoryListResolverService} from './shared/category-list-resolver.service';
import {BookListResolverService} from './shared/book-list-resolver.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    BookService,
    CategoryService,
    CategoryListResolverService,
    BookListResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
