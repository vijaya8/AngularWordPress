import {Component, OnInit} from '@angular/core';
import {ProjectlistService} from '../projectlist.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  title: string;
  content: string;

  constructor(private project: ProjectlistService) {
  }


  createPost(createPostData: any) {
    this.project.createPosts(createPostData)
      .subscribe((result => {
        console.log('successfully post created', result);
      }));
  }

  ngOnInit() {
  }

}
