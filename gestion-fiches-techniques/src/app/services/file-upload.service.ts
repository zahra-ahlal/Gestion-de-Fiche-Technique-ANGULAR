import { ConditionalExpr } from '@angular/compiler';
import { Injectable, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/file-upload.model';
 

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  
  private basePath = 'uploads';


  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }
  
  @Input()  imageDetailList: AngularFireList<any>;

  pushFileToStorage(fileUpload: FileUpload, nameImg: string): Observable<number | undefined> {
    const filePath = `${this.basePath}/${nameImg}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, nameImg);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }


  getImageDetailList() {
    this.imageDetailList = this.db.list('/uploads');
  }

  insertImageDetails(imageDetails) {
    console.log(imageDetails.category);
    //this.imageDetailList = this.db.list('/uploads');
    this.imageDetailList.push({
      imageDetails,
    })
    //console.log(this.imageDetailList)
  }

}

////////////////

