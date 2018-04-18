import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProjectlistService} from '../projectlist.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  title: string;
  content: string;
  @Output() messageEvent = new EventEmitter<boolean>();
  created: boolean;

  constructor(private project: ProjectlistService) {
    this.created = true;
  }


  createPost(createPostData: any) {
    this.project.createPosts(createPostData)
      .subscribe((result => {
        alert('Post Created Successfully!');
        this.created = false;
        this.messageEvent.emit(this.created);
      }));
  }

  ngOnInit() {
  }

}
