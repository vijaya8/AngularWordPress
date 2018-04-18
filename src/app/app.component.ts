import {Component, OnInit} from '@angular/core';
import {ProjectlistService} from './projectlist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular WordPress RestApi';
  postData: any;
  enableCreate: boolean;

  constructor(private user: ProjectlistService) {
    this.enableCreate = false;
  }

  createPost(postData: any) {
    this.enableCreate = true;
  }

  updatePost(postData: any) {
    this.user.updatePosts(postData)
      .subscribe(updatedData => {
        alert('Post is Updated successfully!');
      });
  }

  deletePost(postData: any) {
    this.user.deletePosts(postData.id)
      .subscribe((postCreatedData => {
        alert('Post is deleted successfully!');
        this.user.getPostsData()
          .subscribe((result => {
            this.postData = result;
            console.log('this.postData', this.postData);
          }));
      }));
  }


  ngOnInit() {
    this.user.getPostsData()
      .subscribe((result => {
        this.postData = result;
        console.log('this.postData', this.postData);
      }));
  }
}
