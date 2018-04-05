import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProjectlistService {

  constructor(private http: HttpClient) {  

  }

  getWordPressData() {
    this.http.get('http://localhost/myfirstwordpressApp/wp-json/wp/v2/posts/'+10)
    .subscribe((result => {
        console.log('result data',result);
    }))
  }

  createPosts() {
    let data = {
      title : 'illumunations',
      content:'this is the content'
    }
    const headers = new HttpHeaders();
    headers.set('Authorization','Basic dmlqYXlhOnZpamF5YUBvbGl2ZUA4Njg=');
    this.http.post('http://localhost/myfirstwordpressApp/wp-json/wp/v2/posts/',data,{headers:headers})
    .subscribe((postCreatedData => {
       console.log('successfully post created',postCreatedData)
    }))
  }

}
