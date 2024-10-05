import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from './comment.service';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.css']
})
export class CommentViewComponent implements OnInit {
  @Input() imageId!: string; 
  @Input() imageTitle!: string;
  comments: Comment[] = [];
  newComment: string = '';

  replyTexts: { [key: string]: string } = {};

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.loadComments(); 
  }

  loadComments(): void {
    if (this.imageId) { 
        this.commentService.getCommentsByImageId(this.imageId).subscribe({
            next: (comments) => {
                this.comments = comments; 
            },
            error: (err) => {
                console.error('Failed to load comments', err);
            }
        });
    } else {
        console.error('No valid imageId provided to CommentViewComponent');
    }
}

addComment(): void {
  if (this.newComment.trim()) {
      this.commentService.createComment(this.imageId, this.newComment).subscribe({
          next: (newComment) => {
              this.loadComments(); 
              this.newComment = ''; 
          },
          error: (err) => {
              console.error('Failed to add comment', err);
          }
      });
  }
}

addReply(comment: Comment): void {
  const replyText = this.replyTexts[comment._id];
  if (replyText && replyText.trim()) {
      this.commentService.createReply(comment._id, replyText).subscribe({
          next: (reply) => {
              this.loadComments(); 
              comment.replies = comment.replies || []; 
              comment.replies.push(reply); 
              this.replyTexts[comment._id] = ''; 
          },
          error: (err) => {
              console.error('Failed to add reply', err);
          }
      });
  }
}
}