import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {switchMap} from 'rxjs/operators';

import { HomeService } from '../services/home.service';

import { Home } from '../shared/home';
import { Comment } from '../shared/comment';

import { visibility, expand } from '../animations/app.animation';

@Component({
  selector: 'app-homedetail',
  templateUrl: './homedetail.component.html',
  styleUrls: ['./homedetail.component.scss'],
  animations: [
    visibility(),
    expand()
  ]
})

export class HomeDetailComponent implements OnInit {

  home: Home;
  homecopy = null; // Restangular object
  homeIds: number[];
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
  
  constructor(private homeservice: HomeService,
    private route: ActivatedRoute,
    private location: Location,
    private fb:FormBuilder,
    @Inject('BaseURL') private BaseURL) {
      this.createForm();
     }

  ngOnInit() {

    this.homeservice.getHomeIds().subscribe(homeIds => this.homeIds = homeIds);
    this.route.params.pipe(
      switchMap((params: Params) => { this.visibility = 'hidden'; return this.homeservice.getHome(+params['id']); }) // (+) converts string id to a number
      ).subscribe(home => { this.home = home; this.homecopy = home; this.setPrevNext(home.id); this.visibility = 'shown'; }, 
        errmess => this.errMess = <any>errmess);
    
  }

  setPrevNext(homeId: number) {
    let index = this.homeIds.indexOf(homeId);
    this.prev = this.homeIds[(this.homeIds.length + index - 1)%this.homeIds.length];
    this.next = this.homeIds[(this.homeIds.length + index + 1)%this.homeIds.length];
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
    this.homecopy.comments.push(this.comment);
    this.homecopy.save()
      .subscribe(home => { this.home = home; console.log(this.home); });
    console.log(this.comment);
    this.comment = null;
    this.commentForm.reset({
      author: '',
      comment: '',
      rating: 5
    });
  }

}