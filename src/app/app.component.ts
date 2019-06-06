import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd,
  NavigationCancel, NavigationError, Event } from '@angular/router';

import {Category} from './models/category.model';
import {CategoryService} from './shared/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  categories:Category[];
  showLoadingIndicator=true;

  constructor(private _categoryService:CategoryService,
    private _router:Router) {
      this._router.events.subscribe((routerEvent:Event)=>{
        if(routerEvent instanceof NavigationStart){
          this.showLoadingIndicator=true;
        }
        if (routerEvent instanceof NavigationEnd ||
          routerEvent instanceof NavigationError ||
          routerEvent instanceof NavigationCancel) {
          this.showLoadingIndicator = false;
        }
  
      });
     }

    ngOnInit() {
      this._categoryService.getCategories().subscribe(
        (categoryList)=>this.categories=categoryList,
        (err)=>console.log(err)
      );
     // console.log("categories",this.categories);
    }
  
    onClick(categoryId: string) {
      this._router.navigate(['/categories/books', categoryId]);
    }

}
