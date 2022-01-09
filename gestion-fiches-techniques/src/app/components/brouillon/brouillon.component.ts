import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-brouillon',
  templateUrl: './brouillon.component.html',
  styleUrls: ['./brouillon.component.scss']
})
export class BrouillonComponent implements OnInit {

  title = 'angular13';
  searchText = "";
  listOfContacts:any ;
  constructor(private http: HttpClient){
    //get request from web api
    this.http.get('https://www.testjsonapi.com/users/').subscribe(data => {
    
      this.listOfContacts = data;
   
          }, error => console.error(error));
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  Search(){
    // alert(this.searchText)
     if(this.searchText!== ""){
       let searchValue = this.searchText.toLocaleLowerCase();
      
       this.listOfContacts = this.listOfContacts.filter((contact:any) =>{
         return contact.name.toLocaleLowerCase().match(searchValue )
         ;
       // you can keep on adding object properties here   
       
             });
             
             console.log(this.listOfContacts);
           }
           else { 
            this.http.get('https://www.testjsonapi.com/users/').subscribe(data => {
     
               this.listOfContacts = data;
            
                   }, error => console.error(error));
             // if(this.searchText== ""){ you don't need this if
             
           } 
      }

}
