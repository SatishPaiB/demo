import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {switchMap} from 'rxjs/operators';

import { ShopService } from '../services/shop.service';

import { Shop } from '../shared/shop';
import { Comment } from '../shared/comment';

import { visibility, expand } from '../animations/app.animation';

@Component({
  selector: 'app-shopdetail',
  templateUrl: './shopdetail.component.html',
  styleUrls: ['./shopdetail.component.scss'],
  animations: [
    visibility(),
    expand()
  ]
})
export class ShopDetailComponent implements OnInit {

  shop: Shop;
  shopcopy = null; // Restangular object
  shopIds: number[];
  prev: number;
  next: number;

  errMess: string;

  commentForm: FormGroup;
  comment: Comment;

  visibility = 'shown';

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.',
      'maxlength':     'Author Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'Comment must be at least 1 characters long.'
    }
  };
  
  constructor(private shopservice: ShopService,
    private route: ActivatedRoute,
    private location: Location,
    private fb:FormBuilder,
    @Inject('BaseURL') private BaseURL) {
      this.createForm();
     }

  ngOnInit() {

    this.shopservice.getShopIds().subscribe(shopIds => this.shopIds = shopIds);
    this.route.params.pipe(
      switchMap((params: Params) => { this.visibility = 'hidden'; return this.shopservice.getShop(+params['id']); }) // (+) converts string id to a number
      ).subscribe(shop => { this.shop = shop; this.shopcopy = shop; this.setPrevNext(shop.id); this.visibility = 'shown'; }, 
        errmess => this.errMess = <any>errmess);
    
  }

  setPrevNext(shopId: number) {
    let index = this.shopIds.indexOf(shopId);
    this.prev = this.shopIds[(this.shopIds.length + index - 1)%this.shopIds.length];
    this.next = this.shopIds[(this.shopIds.length + index + 1)%this.shopIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      comment: ['', [Validators.required, Validators.minLength(1)] ],
      rating: 5
    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
    this.comment = form.value;
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.shopcopy.comments.push(this.comment);
    this.shopcopy.save()
      .subscribe(shop => { this.shop = shop; console.log(this.shop); });
    console.log(this.comment);
    this.comment = null;
    this.commentForm.reset({
      author: '',
      comment: '',
      rating: 5
    });
  }

}