export class FileUpload {
    key!: string;
    name!: string;
    url!: string;
    file: File;
    category:string;
    /*caption: string;
    category:string;
    imageUrl: string;*/
  
    constructor(file: File) {
      this.file = file;
    }
}