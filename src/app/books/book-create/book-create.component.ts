import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import {Router,ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


import{Book} from '../../models/book.model';
import { BookService } from 'src/app/shared/book.service';
import {CategoryService} from '../../shared/category.service';
import { Category } from 'src/app/models/category.model';
//import {Author} from '../../models/author.model';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {
   
  bookForm:FormGroup;
  book:Book;
  categories:Category[];
  FormTitle:string;
  imagePath:string;
  imgURL:any;
  message:string;
  formErrors = {
  };
  datePickerConfig: Partial<BsDatepickerConfig>;
  validationMessages={
    'title':{
      'required':'Title is required.'
    },
    'price':{
      'required':'Price is required.',
      'pattern':'Please enter valid number.'
    },
    // 'image': {
    //   'required':'Iamge is required.'
    // },
    'publisher': {
      'required':'Publisher is required.'
    },
    'publicationDate':{
      'required':'Publication Date is required.'
    },
    'ISBN':{
      'required':'ISBN is required.',
      'pattern':'Please enter valid ISBN (10 or 13 numbers).'
    },
    'stock':{
      'required':'Stock is required.',
      'pattern':'Please enter valid number.'
    },
    'description':{
      'maxLength':'Description must be less than 300 characters.'
    },
    // 'category':{
    //   'required':'Category is required.'
    // }
  };
  

  constructor(private _bookService:BookService,
              private _categoryService:CategoryService,
              private _router:Router,
              private fb: FormBuilder,
              private _route: ActivatedRoute) {
                this.datePickerConfig = Object.assign({}, { 
                  containerClass: 'theme-dark-blue',
                  maxDate: new Date()
                 });
               }

  ngOnInit() {
    //build form using form builder
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      price: ['0', [
        Validators.required,
        Validators.pattern("^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$")]
      ],
      //image: ['', Validators.required],
      publisher: ['', Validators.required],
      publicationDate:['', Validators.required],
      ISBN: ['', [
        Validators.required,
       Validators.pattern("(ISBN[-]*(1[03])*[ ]*(: ){0,1})*(([0-9Xx][- ]*){13}|([0-9Xx][- ]*){10})")]
      ],
      stock:['0', [
        Validators.required,
        Validators.pattern("^[0-9]+$")]],
      description:[''],
      category:['-1'],
      authors: this.fb.array([
        this.addAuthorFormGroup()
      ])
    });

    //listeten form controls and show validation errors message
    this.bookForm.valueChanges.subscribe((data)=>{
      this.logValidationErrors(this.bookForm);
    });

    
    //initialise 
    this._route.paramMap.subscribe(parameterMap=>{
      const id=parameterMap.get('id');
      if(id){
        this.getBook(id);
        this.FormTitle="Edit Book";
      }else{
        this.FormTitle="Create Book";
        this.book = {
          _id: null,
          title: '',
          price:null ,
          image: '',
          author: [],
          publisher: '',
          publicationDate:null,
          ISBN: '',
          stock: null,
          description: '',
          category: ''
        };
      }
    })
   // get all categories
    this._categoryService.getCategories().subscribe(
      (categories) => this.categories = categories,
      (err) => console.log(err)
    );
    
  }

  //get book data from server
  getBook(id:string){
    this._bookService.getBook(id)
        .subscribe(
          (book)=>{
            this.book=book;
            this.book.publicationDate = new Date(this.book.publicationDate);
            this.editBook(book)
          },
          (err)=>console.log(err)
        );
  }

  //populate form controls using book data from server
  editBook(book:Book){
    this.bookForm.patchValue({
      title: book.title,
      price: book.price,
      image: book.image,
      publisher: book.publisher,
      publicationDate: book.publicationDate,
      ISBN: book.ISBN,
      stock: book.stock,
      description: book.description,
      category: book.category
    });
    this.bookForm.setControl('authors',this.setAuthors(book.author));
  }

  setAuthors(authors:string[]):FormArray {
    const formArray=new FormArray([]);
   // if(authors){
      authors.forEach(author=>{
        formArray.push(this.fb.group({
          authorName:author
        }));
      });
   // }
    return formArray;
  }


  logValidationErrors(group: FormGroup = this.bookForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
  
      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationMessages[key];
  
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
  
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }

  get authorArray() {
    return this.bookForm.get('authors') as FormArray;
  }

  addAuthorFormGroup(): FormGroup {
    return this.fb.group({
      authorName: ['', Validators.required]
    });
  }

  addAuthor():void{
    this.authorArray.push(this.addAuthorFormGroup());
  }
  deleteAuthor(i:number):void{
    this.authorArray.removeAt(i);
    this.authorArray.markAsDirty();
    this.authorArray.markAsTouched;
  }

  onSubmit(): void {
    this.mapFormValuesToBookModel();
    if(this.book._id){
      console.log("new",this.book);
      this._bookService.updateBook(this.book).subscribe(
        ()=>this._router.navigate(['books']),
        (err:any)=>console.log(err)     
      );
    }else{
      console.log("new",this.book);
      this._bookService.addBook(this.book).subscribe(
        ()=>this._router.navigate(['books']),
        (err:any)=>console.log(err)
      );
    }
  }

  //update book model using form value
  mapFormValuesToBookModel() {
    this.book.title = this.bookForm.value.title;
    this.book.publisher = this.bookForm.value.publisher;
    this.book.publicationDate = new Date(this.bookForm.value.publicationDate);
    this.book.image = this.bookForm.value.image;
    this.book.ISBN = this.bookForm.value.ISBN;
    this.book.price = this.bookForm.value.price;
    this.book.stock = this.bookForm.value.stock;
    if(this.book.author.length>0){
      this.book.author=[];
      for (let authorValue of this.bookForm.value.authors) {
        this.book.author.push(authorValue.authorName);
      }
    }else{
      for (let authorValue of this.bookForm.value.authors) {
        this.book.author.push(authorValue.authorName);
      }
    }
   


    console.log("authorValue", this.bookForm.value.authors);
    console.log("author", this.book.author);
    this.book.category = this.bookForm.value.category;
    this.book.description = this.bookForm.value.description;
  }

    // preview(files) {
    //   //check whether there are no files to upload
    //   if (files.length === 0)
    //     return;
   
    //   //validate the mime type of the uploaded file as only image
    //   var mimeType = files[0].type;
    //   if (mimeType.match(/image\/*/) == null) {
    //     this.message = "Only images are supported.";
    //     return;
    //   }
   
    //   var reader = new FileReader();
    //   this.imagePath = files;
    //   reader.readAsDataURL(files[0]); 
    //   reader.onload = (_event) => { 
    //     //result attribute contains URL representing file's data
    //     this.imgURL = reader.result; 
    //   }
    // }


}
