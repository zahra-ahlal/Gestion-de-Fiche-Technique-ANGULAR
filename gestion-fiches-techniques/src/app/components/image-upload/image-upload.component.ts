import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  filePath:String;
  constructor(private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  upload(event) {    
    this.filePath = event.target.files[0]
  }
  uploadImage(){
    console.log(this.filePath)
    this.afStorage.upload('/images'+Math.random()+this.filePath, this.filePath);   
  }

  

}


//////
