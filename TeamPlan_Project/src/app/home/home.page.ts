import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServicesService} from './../services/app-services.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  title:string = "Default string";
  content:string = "Default content";
  projects:string[]=["hello","hello2","hello3","hello4","hello5"];

  constructor(private router: Router, private serv : AppServicesService) {
  }

  ngOnInit(){
    this.login();
  }


  login(){
    this.serv.getAllCards().subscribe( res => {
      console.log(res);
      console.log(res["name"]);
    });

  }

}
