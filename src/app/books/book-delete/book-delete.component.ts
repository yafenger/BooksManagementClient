import { Component, OnInit,Inject } from '@angular/core';
import{MatDialogRef,MAT_DIALOG_DATA}  from '@angular/material';
import { BookService } from 'src/app/shared/book.service';
import {Book} from '../../models/book.model';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css']
})
export class BookDeleteComponent implements OnInit {

 // deletedBook:Book;

  constructor(public dialogRef:MatDialogRef<BookDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _bookService:BookService) { }

  ngOnInit() { 
  //   this._bookService.getBook(this.bookID).subscribe(
  //   (book)=>this.deletedBook=book,
  //   (err: any) => console.log(err)
  // );
  }

  cancel(): void {
    this.dialogRef.close();
  }


  delete(){
    this.dialogRef.close(this.data);
    //console.log("data",this.data.bookID); 
    this._bookService.deleteBook(this.data.bookID).subscribe(
      () => console.log(`Book with ID = ${this.data.bookID} has been Deleted`),
      (error: any) => { console.log(error); }
    );
    location.reload();
  }


}
