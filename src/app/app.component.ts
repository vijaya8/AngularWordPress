import { Component, OnInit} from '@angular/core';
import { ProjectlistService } from './projectlist.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular Route Gaurds';

  constructor(private user:ProjectlistService) {

  }

  ngOnInit(){
    this.user.getWordPressData();
    this.user.createPosts();
 }
}
