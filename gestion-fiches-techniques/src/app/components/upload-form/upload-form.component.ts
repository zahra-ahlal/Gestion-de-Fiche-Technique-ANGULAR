import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FileUpload } from '../../models/file-upload.model';

import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { finalize } from "rxjs/operators";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ICategFiches } from '../../models/categFiches.model';
import { CategFichesService } from 'src/app/services/categ-fiches.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  
  //test

  filePath:String;



  //TEST
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;

  formTemplate = new FormGroup({
    caption: new FormControl('', Validators.required),
    category: new FormControl(''),
    imageUrl: new FormControl('', Validators.required)
  })
  ///////////////////

  categories: ICategFiches[] = [];
  constructor(private uploadService: FileUploadService,private afStorage: AngularFireStorage,
    private categService: CategFichesService,
    private modal: NgbModal,private router: Router) { }

  ngOnInit(): void {

    this.categService.getCategFiches().subscribe((res: ICategFiches[]) => {
      this.categories = res;
    })

    this.resetForm();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(nameImg: string): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload,nameImg).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }

  }

  //TEST
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = '/assets/img/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }


  //TEST
 /*
  upload2(event) {    
    this.filePath = event.target.files[0]
  }

  uploadImage2(){
    console.log(this.filePath)
    this.afStorage.upload('/images'+Math.random()+this.filePath, this.filePath);   
  }*/

  onSubmit(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      /*var filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.afStorage.ref(filePath);
      this.afStorage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            //this.uploadService.insertImageDetails(formValue);
            this.upload();
            //this.uploadService.insertImageDetails(formValue);
            this.resetForm();

          })
        })
      ).subscribe();*/
      this.upload(formValue.category);
      
     
      //var filePath2 = `${this.selectedImage.name}_${new Date().getTime()}`
      //this.afStorage.upload('/images'+Math.random()+filePath2, filePath2);   
    }
  }

  get formControls() {
    return this.formTemplate['controls'];
  }
  
  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption: '',
      imageUrl: '',
      category: 'Animal'
    });
    this.imgSrc = '/assets/img/image_placeholder.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
  }
}


//////////////////////////////////////


