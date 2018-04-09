import { Component, OnInit} from '@angular/core';
import { ProjectlistService } from './projectlist.service';
import { window } from 'rxjs/operator/window';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular WordPress RestApi';
  postData: any;
  enableCreate: boolean;

  constructor(private user:ProjectlistService) {
    this.enableCreate = false;
  }

  createPost(postData: any){
    console.log('coming here fun');
    this.enableCreate = true;
  }

  deletePost(postData: any){
    console.log('coming here fun');
    this.user.deletePosts(postData.id)
    .subscribe((postCreatedData => {
      alert('Post is deleted successfuly!');
      this.user.getPostsData()
      .subscribe((result => {
        this.postData = result;
        console.log('this.postData',this.postData);
      }));
    }));
  }

  updatePost(postData: any){
    console.log('postData',postData);
    this.user.updatePosts(postData)
    .subscribe(updatedData => {
        alert('Post is Updated successfuly!');
    })
  }

  ngOnInit(){
    this.user.getPostsData()
    .subscribe((result => {
      this.postData = result;
      console.log('this.postData',this.postData);
    }));
 }
}
