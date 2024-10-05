import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MessageService } from 'primeng/api';

interface FileUploadStatus {
    file: File;
    progress: number;
    retry: boolean;
    error: boolean;
    chunkIndex: number;
    totalChunks: number;
}

interface UploadResponse {
    message: string;
}

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css'],
    providers: [MessageService]
})
export class FileUploadComponent {
    selectedFiles: FileUploadStatus[] = [];
    backendUrl: string = 'http://localhost:3001/file/upload-chunk';
    CHUNK_SIZE: number = 500 * 1024; // 500KB

    constructor(private http: HttpClient, private messageService: MessageService) {}

    onFileSelected(event: Event) {
        const target = event.target as HTMLInputElement;
        const files: FileList | null = target.files;

        if (files) {
            Array.from(files).forEach((file: File) => {
                this.selectedFiles.push({
                    file: file,
                    progress: 0,
                    retry: false,
                    error: false,
                    chunkIndex: 0,
                    totalChunks: Math.ceil(file.size / this.CHUNK_SIZE)
                });
            });
        }
    }

    onPrimeNGUpload(event: any) {
        const files: FileList = event.files;

        Array.from(files).forEach((file: File) => {
            this.selectedFiles.push({
                file: file,
                progress: 0,
                retry: false,
                error: false,
                chunkIndex: 0,
                totalChunks: Math.ceil(file.size / this.CHUNK_SIZE)
            });
        });

        this.uploadAll();
    }

    async uploadFile(fileStatus: FileUploadStatus) {
      const { file } = fileStatus;
      const totalChunks = Math.ceil(file.size / this.CHUNK_SIZE); 
  
      for (let chunkIndex = fileStatus.chunkIndex; chunkIndex < totalChunks; chunkIndex++) {
          const start = chunkIndex * this.CHUNK_SIZE;
          const end = Math.min(start + this.CHUNK_SIZE, file.size);
          const chunk = file.slice(start, end);
  
          const formData = new FormData();
          formData.append('file', chunk, file.name);
          formData.append('filename', file.name);
          formData.append('totalSize', file.size.toString());
          formData.append('chunkIndex', chunkIndex.toString());
          formData.append('totalChunks', totalChunks.toString()); 
          formData.append('userId', '66fbbb725f4f064826a4d223'); 
  
          fileStatus.progress = 0;
          fileStatus.retry = false;
          fileStatus.error = false;
  
          try {
              const event = await this.http.post<UploadResponse>(this.backendUrl, formData, { reportProgress: true, observe: 'events' }).toPromise() as any;
  
              if (event) {
                  if (event.type === HttpEventType.UploadProgress && event.total) {
                      fileStatus.progress = Math.round((event.loaded / event.total) * 100);
                  } else if (event.type === HttpEventType.Response) {
                      if (event.body && event.body.message === 'Chunk uploaded successfully') {
                          fileStatus.chunkIndex = chunkIndex + 1;
                      } else {
                          this.messageService.add({ severity: 'success', summary: 'Upload Complete', detail: `${file.name} uploaded successfully!` });
                          break;
                      }
                  }
              } else {
                  fileStatus.error = true;
                  this.messageService.add({ severity: 'error', summary: 'Upload Failed', detail: `No response from server while uploading chunk ${chunkIndex + 1}.` });
                  break;
              }
          } catch (error) {
              fileStatus.error = true;
              this.messageService.add({ severity: 'error', summary: 'Upload Failed', detail: `Failed to upload chunk ${chunkIndex + 1} of ${totalChunks}.` });
              break; 
          }
      }
  }

    retryFileUpload(fileStatus: FileUploadStatus) {
        this.uploadFile(fileStatus);
    }

    uploadAll() {
        if (this.selectedFiles.length === 0) {
            this.messageService.add({ severity: 'warn', summary: 'No Files Selected', detail: 'Please select files to upload.' });
            return;
        }

        this.selectedFiles.forEach((fileStatus) => {
            this.uploadFile(fileStatus);
        });
    }
}