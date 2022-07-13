import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public displayCreatePostsBool = false;
  public displaySearchPostsBool = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  displayCreatePosts() {
    this.displayCreatePostsBool = !this.displayCreatePostsBool;
  }

  displaySearchPosts() {
    this.displaySearchPostsBool = !this.displaySearchPostsBool;
  }
}
