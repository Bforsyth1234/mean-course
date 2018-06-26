import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PostsService } from './../posts.service';
import { Post } from './../post.model';
import { PageEvent } from '@angular/material';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  totalPosts = 10;
  postsPerPage = 2;
  pageSizeOptions = [1 , 2, 5, 10];
  private postSub: Subscription;

  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts();
    this.isLoading = true;
    this.postSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onChangePage(pageData: PageEvent) {
    console.log('pageData = ');
    console.log(pageData);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

  onDelete(id: string) {
    this.postsService.deletePost(id);
  }

}
