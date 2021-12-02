import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  title:string = "Default string";
  content:string = "Default content";
  constructor() {
    this.login();
  }


  login(){
    this.title="Hello"

  }

}
