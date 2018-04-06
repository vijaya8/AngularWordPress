import { Component, OnInit} from '@angular/core';
import { ProjectlistService } from './projectlist.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular WordPress RestApi';

  constructor(private user:ProjectlistService) {

  }

  createPost(){
    console.log('coming here fun');
    this.user.getSisenceData().then(postCreatedData => {
      console.log('postCreatedData',postCreatedData);
    });
  }

  deletePost(){
    console.log('coming here fun');
    this.user.deletePosts()
    .subscribe((postCreatedData => {
      console.log('successfully post created',postCreatedData)
    }));
  }

  ngOnInit(){
    //this.user.getWordPressData();
   //this.user.getSisenceData();
 }
}
