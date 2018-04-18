import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Project} from './project';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ProjectlistService {


  constructor(private http: HttpClient) {

  }

  getPostsData() {
    const _headers = new HttpHeaders();
    const headers = _headers.set('Content-Type', 'application/json')
      .set('authorization', 'Basic ' + btoa('olivewpr:v3Jo140tsU'));
    return this.http.get('http://olivewprest.tryfcomet.com/wp-json/wp/v2/posts/', {headers: headers});
  }

  async getSisenceData() {
    const _headers = new HttpHeaders();
    const headers = _headers
      .set('Content-Type', 'application/json')
      .set('authorization',
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiNTgwOGJkNmQ4MTBjMGFjNGQ4OGFkYTQ1IiwiYXBpU2VjcmV0IjoiOGM1YmRhMDktOWI5MS02OGQ0LTk5OTMtZTA3YzNkMzQ1ZTYyIiwiaWF0IjoxNDgxMTQ5MDAyfQ.Tgw8Sv_Z5FUKVxy0KnCfNoWzZaKBOpXR0nQVSruDlrM');
    await this.http.get('http://localhost:8001/api/sisense/sql?query=Projects', {headers: headers})
      .subscribe((result => {
        const projects = Project.fromSisenseResponseArray(result);
        const ObservableBatch = [];
        ObservableBatch.push(this.createPosts(projects[12].projectName));
        // for (const project of projects) {
        //   console.log('projects',project.projectName);
        //      ObservableBatch.push(this.createPosts(project.projectName));
        //   }
        return Observable.forkJoin(ObservableBatch);
      }));
  }


  createPosts(postData: any) {
    const data = {
      title: postData.title,
      status: 'publish',
      slug: postData.title,
      content: postData.content,
      author: 1,
      excerpt: postData.content,
      featured_media: 10,
      categories: 3,
      tags: 9,
      format: 'quote',
      comment_status: 'open',
      ping_status: 'open'
    };
    const _headers = new HttpHeaders();
    const headers = _headers.set('Content-Type', 'application/json')
      .set('authorization', 'Basic ' + btoa('olivewpr:v3Jo140tsU'));

    return this.http.post('http://olivewprest.tryfcomet.com/wp-json/wp/v2/posts/', data,
      {headers: headers});

  }

  updatePosts(postData: any) {
    const data = {
      title: postData.title.rendered,
      status: postData.status,
      content: postData.content.rendered,
      protected: false,
      categories: 4,
    };
    const _headers = new HttpHeaders();
    const headers = _headers.set('Content-Type', 'application/json')
      .set('authorization', 'Basic ' + btoa('olivewpr:v3Jo140tsU'));

    return this.http.post('http://olivewprest.tryfcomet.com/wp-json/wp/v2/posts/' + postData.id,
      data, {headers: headers});
  }

  deletePosts(postId: string) {
    const _headers = new HttpHeaders();
    const headers = _headers.set('Content-Type', 'application/json')
      .set('authorization', 'Basic ' + btoa('olivewpr:v3Jo140tsU'));

    return this.http.delete('http://olivewprest.tryfcomet.com/wp-json/wp/v2/posts/' + postId,
      {headers: headers});
  }


}
