// import { Component } from '@angular/core';
// import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
// import { MessageService } from 'primeng/api';

// interface UploadResponse {
//   message: string;
//   status?: string;
// }

// interface FileUploadStatus {
//   file: File;
//   progress: number;
//   retry: boolean;
//   error: boolean;
//   chunkIndex: number;
//   totalChunks: number;
//   completed: boolean;
// }

// @Component({
//   selector: 'app-file-upload',
//   templateUrl: './file-upload.component.html',
//   styleUrls: ['./file-upload.component.css'],
//   providers: [MessageService]
// })
// export class FileUploadComponent {
//   selectedFiles: FileUploadStatus[] = [];
//   backendUrl: string = 'http://localhost:3001/file/upload-chunk';
//   CHUNK_SIZE: number = 500 * 1024; // 500KB

//   constructor(private http: HttpClient, private messageService: MessageService) {}

//   onPrimeNGUpload(event: any) {
//     const files: File[] = event.files;
//     files.forEach((file: File) => {
//       // Check if the file is not already completed or not in progress
//       const existingFile = this.selectedFiles.find(f => f.file.name === file.name);
//       if (!existingFile) {
//         this.selectedFiles.push({
//           file: file,
//           progress: 0,
//           retry: false,
//           error: false,
//           chunkIndex: 0,
//           totalChunks: Math.ceil(file.size / this.CHUNK_SIZE),
//           completed: false
//         });
//       } else if (existingFile.completed) {
//         this.messageService.add({
//           severity: 'info',
//           summary: 'File Already Uploaded',
//           detail: `${file.name} is already uploaded and won't be re-uploaded.`,
//         });
//       } else {
//         this.messageService.add({
//           severity: 'warn',
//           summary: 'File in Progress',
//           detail: `The file ${file.name} is already being uploaded. Please wait.`,
//         });
//       }
//     });

//     this.uploadAll();
//   }

//   async uploadFile(fileStatus: FileUploadStatus) {
//     const { file } = fileStatus;
//     const totalChunks = fileStatus.totalChunks;

//     for (let chunkIndex = fileStatus.chunkIndex; chunkIndex < totalChunks; chunkIndex++) {
//       const start = chunkIndex * this.CHUNK_SIZE;
//       const end = Math.min(start + this.CHUNK_SIZE, file.size);
//       const chunk = file.slice(start, end);

//       const formData = new FormData();
//       formData.append('file', chunk, file.name);
//       formData.append('filename', file.name);
//       formData.append('totalSize', file.size.toString());
//       formData.append('chunkIndex', chunkIndex.toString());
//       formData.append('totalChunks', totalChunks.toString());
//       formData.append('userId', '66fbbb725f4f064826a4d223');  // Placeholder for user ID

//       fileStatus.error = false;

//       try {
//         const event = await this.http.post<UploadResponse>(this.backendUrl, formData, {
//           reportProgress: true,
//           observe: 'events',
//         }).toPromise() as any;

//         if (event) {
//           if (event.type === HttpEventType.UploadProgress && event.loaded && event.total) {
//             // Calculate progress based on bytes uploaded so far
//             const percentage = Math.round((chunkIndex + 1) / totalChunks * 100);
//             fileStatus.progress = percentage; // Update progress
//           } else if (event.type === HttpEventType.Response) {
//             if (event.body && event.body.message === 'Chunk uploaded successfully') {
//               fileStatus.chunkIndex = chunkIndex + 1;

//               // Update the overall progress based on the chunk index
//               fileStatus.progress = Math.round((fileStatus.chunkIndex / totalChunks) * 100);

//               // Debug log for tracking chunk upload
//               console.log(`Uploaded chunk ${chunkIndex + 1}/${totalChunks} for file: ${file.name}`);

//               // Stop loop if all chunks are uploaded
//               if (fileStatus.chunkIndex === totalChunks) {
//                 fileStatus.progress = 100;  // Ensure 100% progress is shown when all chunks are uploaded
//                 fileStatus.completed = true;  // Mark the file as completed
//                 this.messageService.add({ severity: 'success', summary: 'Upload Complete', detail: `${file.name} uploaded successfully!` });
//                 break;
//               }
//             }
//           }
//         } else {
//           fileStatus.error = true;
//           this.messageService.add({
//             severity: 'error',
//             summary: 'Upload Failed',
//             detail: `No response from server while uploading chunk ${chunkIndex + 1}.`,
//           });
//           break;
//         }
//       } catch (error) {
//         fileStatus.error = true;
//         this.messageService.add({
//           severity: 'error',
//           summary: 'Upload Failed',
//           detail: `Failed to upload chunk ${chunkIndex + 1} of ${totalChunks}.`,
//         });
//         break;
//       }
//     }
//   }

//   retryFileUpload(fileStatus: FileUploadStatus) {
//     fileStatus.error = false;  // Reset error state before retrying
//     this.uploadFile(fileStatus);
//   }

//   uploadAll() {
//     if (this.selectedFiles.length === 0) {
//       this.messageService.add({ severity: 'warn', summary: 'No Files Selected', detail: 'Please select files to upload.' });
//       return;
//     }

//     this.selectedFiles.forEach((fileStatus) => {
//       if (!fileStatus.completed) {
//         this.uploadFile(fileStatus);
//       }
//     });
//   }
// }

import { Component } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

interface UploadResponse {
  message: string;
  status?: string;
}

interface FileUploadStatus {
  file: File;
  progress: number;
  retry: boolean;
  error: boolean;
  chunkIndex: number;
  totalChunks: number;
  completed: boolean;
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

  onPrimeNGUpload(event: any) {
    const files: File[] = event.files;
    files.forEach((file: File) => {
      // Check if the file is not already completed or not in progress
      const existingFile = this.selectedFiles.find(f => f.file.name === file.name);
      if (!existingFile) {
        this.selectedFiles.push({
          file: file,
          progress: 0,
          retry: false,
          error: false,
          chunkIndex: 0,
          totalChunks: Math.ceil(file.size / this.CHUNK_SIZE),
          completed: false
        });
      } else if (existingFile.completed) {
        this.messageService.add({
          severity: 'info',
          summary: 'File Already Uploaded',
          detail: `${file.name} is already uploaded and won't be re-uploaded.`,
        });
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'File in Progress',
          detail: `The file ${file.name} is already being uploaded. Please wait.`,
        });
      }
    });

    this.uploadAll();
  }

  async uploadFile(fileStatus: FileUploadStatus) {
    const { file } = fileStatus;
    const totalChunks = fileStatus.totalChunks;

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
      formData.append('userId', '66fbbb725f4f064826a4d223');  // Placeholder for user ID

      fileStatus.error = false;

      try {
        const event = await this.http.post<UploadResponse>(this.backendUrl, formData, {
          reportProgress: true,
          observe: 'events',
        }).toPromise() as any;

        if (event) {
          if (event.type === HttpEventType.UploadProgress && event.loaded && event.total) {
            // Calculate progress based on the chunk index + 1, as the first chunk is index 0
            const percentage = Math.round(((chunkIndex + 1) / totalChunks) * 100);
            fileStatus.progress = percentage; // Update progress
          } else if (event.type === HttpEventType.Response) {
            // Check if the chunk upload was successful
            if (event.body && event.body.message === 'Chunk uploaded successfully') {
              fileStatus.chunkIndex = chunkIndex + 1;

              // Debug log for tracking chunk upload
              console.log(`Uploaded chunk ${chunkIndex + 1}/${totalChunks} for file: ${file.name}`);
            } else if (event.body && event.body.message === 'File upload and merge completed successfully') {
              // When the merge is complete, set progress to 100%
              fileStatus.progress = 100;
              fileStatus.completed = true;  // Mark the file as completed
              this.messageService.add({ severity: 'success', summary: 'Upload Complete', detail: `${file.name} uploaded and merged successfully!` });
              break;
            }
          }
        } else {
          fileStatus.error = true;
          this.messageService.add({
            severity: 'error',
            summary: 'Upload Failed',
            detail: `No response from server while uploading chunk ${chunkIndex + 1}.`,
          });
          break;
        }
      } catch (error) {
        fileStatus.error = true;
        this.messageService.add({
          severity: 'error',
          summary: 'Upload Failed',
          detail: `Failed to upload chunk ${chunkIndex + 1} of ${totalChunks}.`,
        });
        break;
      }
    }
  }

  retryFileUpload(fileStatus: FileUploadStatus) {
    fileStatus.error = false;  // Reset error state before retrying
    this.uploadFile(fileStatus);
  }

  uploadAll() {
    if (this.selectedFiles.length === 0) {
      this.messageService.add({ severity: 'warn', summary: 'No Files Selected', detail: 'Please select files to upload.' });
      return;
    }

    this.selectedFiles.forEach((fileStatus) => {
      if (!fileStatus.completed) {
        this.uploadFile(fileStatus);
      }
    });
  }
}