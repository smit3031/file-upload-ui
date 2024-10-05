import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment } from '../models/comment.model'; 

@Injectable({
    providedIn: 'root'
  })
  export class CommentService {
    private baseUrl = 'http://localhost:3001'; 
  
    constructor(private http: HttpClient) {}
  
    getCommentsByImageId(imageId: string): Observable<Comment[]> {
      return this.http.get<{ comments: Comment[] }>(`${this.baseUrl}/comments/${imageId}`).pipe(
        map(response => response.comments)
      );
    }
  
    createComment(imageId: string, text: string): Observable<Comment> {
      const commentData = { image: imageId, text }; 
      return this.http.post<Comment>(`${this.baseUrl}/comments`, commentData); 
    }
  
    createReply(commentId: string, text: string): Observable<Comment> {
      const replyData = { text }; 
      return this.http.post<Comment>(`${this.baseUrl}/comments/${commentId}/replies`, replyData); 
    }
  }