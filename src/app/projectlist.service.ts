import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from './project';
import { Observable } from 'rxjs/Rx';
import { publish } from 'rxjs/operators/publish';

@Injectable()
export class ProjectlistService {


  constructor(private http: HttpClient) {  

  }

  getWordPressData() {
    return this.http.get('http://localhost/myfirstwordpressApp/wp-json/wp/v2/posts/'+10)
    .subscribe((result => {
        console.log('result data',result);
    }))
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
          for (const project of projects) {
            console.log('projects',project.projectName);
               ObservableBatch.push(this.createPosts(project.projectName));
            }
          return Observable.forkJoin(ObservableBatch);
      }));
  }

  

  createPosts(projectName: string) {
    let data = {
      title : projectName,
      status: "publish"
    }
    const _headers = new HttpHeaders();
    const headers = _headers.set("Content-Type", "application/json")
    .set("authorization","Basic "+ btoa("vijaya:vijaya@olive@868"));

      return this.http.post('http://localhost/myfirstwordpressApp/wp-json/wp/v2/posts/', data,
                              {headers:headers})
      .subscribe((postCreatedData => {
        console.log('successfully post created',postCreatedData)
      }))
  }

  deletePosts() {
    const _headers = new HttpHeaders();
    const headers = _headers.set("Content-Type", "application/json")
    .set("authorization","Basic "+ btoa("vijaya:vijaya@olive@868"));

      return this.http.delete('http://localhost/myfirstwordpressApp/wp-json/wp/v2/posts/'+ 12269,
                              {headers:headers});
  }

}
