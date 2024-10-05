import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileTableComponent } from './file-table/file-table.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';

import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CommentViewComponent } from './comment-view/comment-view.component';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, FileUploadComponent, FileTableComponent, ImageGalleryComponent, CommentViewComponent],
  imports: [BrowserModule, 
    HttpClientModule, FileUploadModule, ProgressBarModule, TableModule, BrowserAnimationsModule,
    CarouselModule, 
    ButtonModule, 
    InputTextareaModule,
    FormsModule,
    AppRoutingModule,
    DialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}