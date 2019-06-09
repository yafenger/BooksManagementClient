import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



import {Book} from '../../models/book.model';
import {Category} from '../../models/category.model';
import { CategoryService } from 'src/app/shared/category.service';
import { BookService } from 'src/app/shared/book.service';
import {BookDeleteComponent} from '../book-delete/book-delete.component';

//Material
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  categories:Category[];
  books:Book[];
  allBooks:Book[];
  private _id:string;
  isAll:boolean=false;
  specificCategory:Category;
  bookTitle:string;
  selectedBookID:string;
  


  constructor(private _route: ActivatedRoute,
              private _router:Router,
              private _categoryService: CategoryService,
              private _bookService:BookService,
              public dialog: MatDialog,
              private modalService: NgbModal) {
               }

  //click on different categories, different booklist will show
  onClickCategory(id:string,category:Category){
    this.isAll=false;
    this.books=this.allBooks.filter(book=>
    book.category===id);
    this.specificCategory=category;
    console.log("boook",this.books);
  }

  onClickAll(){
    this.books=this.allBooks;
    this.isAll=true;
    this.specificCategory=undefined;
  }

  ngOnInit() {
    
    this._route.paramMap.subscribe(params => {
      this._id = params.get('id'); 
      //get books under one category
      if(this._id){
        this._categoryService.getBooksByCategory(this._id).subscribe(
          (bookList)=>this.books=bookList,
          (err: any) => console.log(err)
        );
      }
      //get all books
      else{
        // this._bookService.getBooks().subscribe(
        //   (bookList)=>this.books=bookList,
        //   (err)=>console.log(err)
        // );
        this.books=this._route.snapshot.data['bookList'];
        this.isAll=true;
      }   
      
    });

    //get all books
    this._bookService.getBooks().subscribe(
      (bookList)=>this.allBooks=bookList,
      (err)=>console.log(err)
    );
    //get all cateories
    this._categoryService.getCategories().subscribe(
      (categoryList)=>this.categories=categoryList,
      (err)=>console.log(err)
    );
    //get the specific category
    this._route.paramMap.subscribe(params => {
      this._id = params.get('id');      
      this._categoryService.getCategory(this._id).subscribe(
        (category)=>this.specificCategory=category,
        (err: any) => console.log(err)
      );
    });

    //get the book which has been edited or added 
    this.selectedBookID=this._route.snapshot.paramMap.get('bookId');
  }

  search(){
    if(this.bookTitle!=""){
      this.books=this.books.filter(book=>book.title.toLowerCase()
      .indexOf(this.bookTitle.toLowerCase())!==-1);
    }
    else{
      //this.ngOnInit();
      this._route.paramMap.subscribe(params => {
        this._id = params.get('id'); 
        if(this._id){
          this._categoryService.getBooksByCategory(this._id).subscribe(
            (bookList)=>this.books=bookList,
            (err: any) => console.log(err)
          );
        }
        else{
          this.books=this._route.snapshot.data['bookList'];
          this.isAll=true;
        }   
        
      });
    }
  }
  notifyDelete(id:string){
    const dialogRef = this.dialog.open(BookDeleteComponent, {
      width: '300px',
      position:{top:'100px'},
      //pass the id of the book which will be deleted
      data:{
        bookID:id
      }
    });
  }

  editBook(id:string){
    this._router.navigate(['books/edit', id]);
  }

  open(descriptionModal:any){
    console.log("before");
    this.modalService.open(descriptionModal,{ size: 'lg' });
  }
 
 
}
