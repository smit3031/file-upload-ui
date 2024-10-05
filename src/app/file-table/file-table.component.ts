import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-file-table',
    templateUrl: './file-table.component.html',
    styleUrls: ['./file-table.component.css']
})
export class FileTableComponent implements OnInit {

    rows: number = 5; 
    totalRecords: number = 0; 

    files: any[] = [
        { no: 1, file_name: 'Document1.pdf', created_at: '2023-09-15' },
        { no: 2, file_name: 'Presentation.pptx', created_at: '2023-09-16' },
        { no: 3, file_name: 'Image.png', created_at: '2023-09-17' },
        { no: 4, file_name: 'Spreadsheet.xlsx', created_at: '2023-09-18' },
        { no: 5, file_name: 'Archive.zip', created_at: '2023-09-19' },
        { no: 5, file_name: 'bookx.epub', created_at: '2023-09-01' },
        { no: 6, file_name: 'ssheet.xlsx', created_at: '2023-10-18' },
        { no: 7, file_name: 'PanCard.pdf', created_at: '2023-09-28' }
    ];

  constructor(private router: Router) {}

  viewComments(image: any) {
    this.router.navigate(['/gallery', image.id]);
  }

    ngOnInit(): void {
        this.totalRecords = this.files.length;
    }

    addFiles(newFiles: File[]) {
        const newEntries = newFiles.map((file: File, index: number) => ({
            no: this.files.length + index + 1,
            file_name: file.name,
            created_at: new Date().toISOString()
        }));

        this.files = [...this.files, ...newEntries];
        this.totalRecords = this.files.length;
    }
}