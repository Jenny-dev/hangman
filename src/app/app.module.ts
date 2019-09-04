import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { LettersViewComponent } from './letters-view/letters-view.component';
import { ImageViewComponent } from './image-view/image-view.component';
import { StatusViewComponent } from './status-view/status-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LettersViewComponent,
    ImageViewComponent,
    StatusViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
