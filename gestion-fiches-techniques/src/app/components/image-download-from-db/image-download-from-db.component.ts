import { Component, OnInit } from '@angular/core';
import { getStorage, ref } from "firebase/storage";
@Component({
  selector: 'app-image-download-from-db',
  templateUrl: './image-download-from-db.component.html',
  styleUrls: ['./image-download-from-db.component.scss']
})
export class ImageDownloadFromDBComponent implements OnInit {
  
  // Create a reference with an initial file path and name
  storage = getStorage();
  pathReference = ref(this.storage, 'images/stars.jpg');

  // Create a reference from a Google Cloud Storage URI
  gsReference = ref(this.storage, 'gs://bucket/images/stars.jpg');

  // Create a reference from an HTTPS URL
  // Note that in the URL, characters are URL escaped!
  httpsReference = ref(this.storage, 'https://firebasestorage.googleapis.com/b/bucket/o/images%20stars.jpg');
  constructor() { }

  ngOnInit(): void {
  }

}


////////////




