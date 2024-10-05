import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Image {
    _id: string;
    filename: string;
    url: string;
    user: string; 
    isImage: boolean;
    description?: string; 
  }

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private baseUrl = 'http://localhost:3001/file'; 

  constructor(private http: HttpClient) {}

  getImagesByUserId(userId: string): Observable<{ images: Image[] }> {
    return this.http.get<{ images: Image[] }>(`${this.baseUrl}/images/${userId}`);
}
}