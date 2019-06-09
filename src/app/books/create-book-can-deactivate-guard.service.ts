import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import{BookCreateComponent} from './book-create/book-create.component';


@Injectable()
export class CreateBookCanDeactivateGuardService
 implements CanDeactivate<BookCreateComponent>{
     constructor(){}

     canDeactivate(component:BookCreateComponent):boolean{
         //if dirty, return confimation
         if(component.bookForm.dirty && component.bookForm.invalid){
             return confirm('Are you sure you want to leave?');
         }else if(component.bookForm.dirty && component.bookForm.valid){
            return confirm('Are you sure you want to submit?');
         }
         //if not dirty,return true, allow navigation
         return true;
     }
    
}