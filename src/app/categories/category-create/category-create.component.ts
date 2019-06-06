import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';

import {Category} from '../../models/category.model';
import { CategoryService } from 'src/app/shared/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  // newCategory:Category={
  //   _id:null,
  //   name:this.data.name
  // }
  categories:Category[];
  constructor(public dialogRef:MatDialogRef<CategoryCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _categoryService: CategoryService) {

     }

  ngOnInit() {
  }


  addCategory() {
    this.dialogRef.close(this.data.name);
    console.log("data",this.data.name);
    let newCategory:Category={
      _id:null,
      name:this.data.name
    }
    if(newCategory){
      console.log("newCategory",newCategory);
      //save new category:data
          this._categoryService.addCategory(newCategory).subscribe(
          (data: Category) => {
            console.log('data', data);
          },       
         (error: any) => { console.log(error); }
        );
    }
    location.reload();
    
    
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
