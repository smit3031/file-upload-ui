import { Component, ViewChild } from '@angular/core';
import { FileTableComponent } from './file-table/file-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(FileTableComponent) fileTable!: FileTableComponent;

  title = 'demo11-ui';

  constructor() {}

  onFilesUploaded(files: any) {
    if (this.fileTable) {
      this.fileTable.addFiles(files);
    }
  }
}