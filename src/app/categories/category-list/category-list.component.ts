import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute } from '@angular/router';

import {Category} from '../../models/category.model';
import {CategoryCreateComponent} from '../category-create/category-create.component';

//Material
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories:Category[];
  name:string;

  constructor(private _router:Router,
              private _route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
   this.categories=this._route.snapshot.data['categoryList'];
  }

  onClick(categoryId: string) {
    this._router.navigate(['categories/books', categoryId]);
  }
  onClickAll(){
    this._router.navigate(['books']);
  }

  //pass CategoryCreteComponent to this host component
  openDialog(): void {
    const dialogRef = this.dialog.open(CategoryCreateComponent, {
      width:'300px',
      position:{top:'100px'},
      disableClose: true,
      //data which can be accessed in the child component
      data:{
       name:this.name
      }
     
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log("result",this.name);
    // });
  }


}
