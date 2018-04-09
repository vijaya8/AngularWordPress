import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProjectlistService } from './projectlist.service';
import {FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { CreatePostComponent } from './create-post/create-post.component';


@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProjectlistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
