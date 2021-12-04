import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task,AppServicesService} from './../services/app-services.service'

interface test{
  id:string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  content:string = "Default content";
  projects:string[]=[];
  tasks:Task[] = [];
  activeproj:string;



  constructor(private router: Router, private serv : AppServicesService) {
  }

  ngOnInit(){

    this.getAllTasks();
    this.getAllProjects();

  }


  getAllTasks(){
    this.serv.getAllCards().subscribe((response:Task[]) => {
      this.tasks=response;

    });

  }

  getAllProjects(){
    this.serv.getAllProjects().subscribe((response:string[]) => {
      this.projects=response;
      this.activeproj=this.projects[0]['title'];
    });

  }

  addTask(){
    this.router.navigate(['signin'])
  }


}
