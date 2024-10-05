import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { CommentViewComponent } from './comment-view/comment-view.component';

const routes: Routes = [
  { path: '', component: FileUploadComponent }, 
  { path: 'gallery', component: ImageGalleryComponent }, 
  { path: 'gallery/:id', component: CommentViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
