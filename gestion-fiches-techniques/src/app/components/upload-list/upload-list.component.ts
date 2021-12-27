import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss']
})
export class UploadListComponent implements OnInit {
  fileUploads?: any[];
  rowIndexArray: any[];

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
    /*this.uploadService.getFiles(6).snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;this.rowIndexArray =  Array.from(Array(Math.ceil((this.fileUploads.length+1) / 3)).keys());
    });
  }*/
    this.uploadService.getFiles(6).snapshotChanges().subscribe(
      list => {
        this.fileUploads = list.map(item => { return item.payload.val(); });
        this.rowIndexArray =  Array.from(Array(Math.ceil((this.fileUploads.length+1) / 3)).keys());
      }
    );
  }
}