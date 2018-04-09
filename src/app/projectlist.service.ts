import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from './project';
import { Observable } from 'rxjs/Rx';
import { publish } from 'rxjs/operators/publish';

@Injectable()
export class ProjectlistService {


  constructor(private http: HttpClient) {  

  }

  getPostsData() {
    return this.http.get('http://localhost/myfirstwordpressApp/wp-json/wp/v2/posts/');
  }

  async getSisenceData() {
    const _headers = new HttpHeaders();
    const headers = 
    _headers
    .set("Content-Type", "application/json")
    .set("authorization","Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiNTgwOGJkNmQ4MTBjMGFjNGQ4OGFkYTQ1IiwiYXBpU2VjcmV0IjoiOGM1YmRhMDktOWI5MS02OGQ0LTk5OTMtZTA3YzNkMzQ1ZTYyIiwiaWF0IjoxNDgxMTQ5MDAyfQ.Tgw8Sv_Z5FUKVxy0KnCfNoWzZaKBOpXR0nQVSruDlrM");
    
    await this.http.get('http://localhost:8001/api/sisense/sql?query=Projects', {headers:headers})
        .subscribe((result => {
          const projects = Project.fromSisenseResponseArray(result);
          let  ObservableBatch=[];
          ObservableBatch.push(this.createPosts(projects[12].projectName));
          // for (const project of projects) {
          //   console.log('projects',project.projectName);
          //      ObservableBatch.push(this.createPosts(project.projectName));
          //   }
          return Observable.forkJoin(ObservableBatch);
      }));
  }

  

  createPosts(postData: any) {
    console.log('in service',postData);
    let data = {
      title : postData.title,
      sticky: false,
      status: "publish",
      slug: postData.title,
      content: postData.title,
      author: 1,
      excerpt: postData.title,
      featured_media: 12798,
      categories: 5,
      tags: 9,
      format: "quote ",
      comment_status: "open",
      ping_status: "open"
    }
    const _headers = new HttpHeaders();
    const headers = _headers.set("Content-Type", "application/json")
    .set("authorization","Basic "+ btoa("vijaya:vijaya@olive@868"));

      return this.http.post('http://localhost/myfirstwordpressApp/wp-json/wp/v2/posts/', data,
                              {headers:headers})
      
  }

  deletePosts(postId: string) {
    const _headers = new HttpHeaders();
    const headers = _headers.set("Content-Type", "application/json")
    .set("authorization","Basic "+ btoa("vijaya:vijaya@olive@868"));

      return this.http.delete('http://localhost/myfirstwordpressApp/wp-json/wp/v2/posts/'+ postId,
                              {headers:headers});
  }

  updatePosts(postData: any) {
    console.log(postData,'postData');
    let data = {
      date:"2018-04-08T19:46:56",
      title : postData.title.rendered,
      status: postData.status,
      content: postData.content.rendered,
      protected:false,
      password:"password@123"
    }
    const _headers = new HttpHeaders();
    const headers = _headers.set("Content-Type", "application/json")
    .set("authorization","Basic "+ btoa("vijaya:vijaya@olive@868"));

      return this.http.post('http://localhost/myfirstwordpressApp/wp-json/wp/v2/posts/'+ postData.id,
                              data, {headers:headers});
  }

}
