import { Component, OnInit } from '@angular/core';
import { ImageService } from './image.service'; 
import { CommentService } from '../comment-view/comment.service'; 

interface Image {
  _id: string;
  filename: string;
  url: string;
  user: string; 
  isImage: boolean;
  description?: string; 
}

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {
  images: Image[] = []; 
  displayComments: boolean = false;
  selectedImage: Image | null = null;
  private userId: string = '66fbbb725f4f064826a4d223'; 

  constructor(private imageService: ImageService, private commentService: CommentService) {}

  ngOnInit(): void {
    this.loadUserImages();
  }

  loadUserImages() {
    this.imageService.getImagesByUserId(this.userId).subscribe(
        (data) => {
            console.log('Fetched images:', data.images);
            this.images = data.images; 
        },
        (error) => {
            console.error('Error fetching images:', error);
        }
    );
  }

  showComments(image: Image) {
    console.log('Selected image:', image); 
    this.selectedImage = image;
    this.displayComments = true;
}
  closeComments() {
    this.displayComments = false;
    this.selectedImage = null;
  }
}