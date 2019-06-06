import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//lazy loading
//go to seperate feature module
const routes: Routes = [
  {
    path:'categories',
    loadChildren:'./categories/categories.module#CategoriesModule'
  },
  {
    path:'books',
    loadChildren:'./books/books.module#BooksModule'
  },
  {
    path:'',
    redirectTo:'/books',
    pathMatch:'full'
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
