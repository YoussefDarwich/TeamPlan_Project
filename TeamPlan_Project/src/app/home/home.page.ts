import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project,Task,AppServicesService} from './../services/app-services.service'
import { Storage } from '@ionic/storage';

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
  projects:Project[]=[];
  tasks:Task[] = [];

  username:string;
  activeproj:number;



  constructor(private storage:Storage,private router: Router, private serv : AppServicesService) {
  }

  ngOnInit(){

    this.storage.get("username").then( (val)=>{
      this.username=val;

      this.getAllProjects(this.username);

    });


  }

  getAllProjects(user:string){
    let jsonuser = {
      'username' : user
    }
    this.serv.getAllProjects(jsonuser).subscribe((response) => {
      this.projects=response;
      this.activeproj=this.projects[0]['id'];

      this.getAllTasks(this.activeproj);
      
    });

  }

  getAllTasks(project_id:number){
    let jsonproject = {
      'project_id' : project_id
    }
    this.serv.getAllCards(jsonproject).subscribe((response) => {
      this.tasks=response;
    });

  }



  addTask(){

    this.router.navigate(['add-task']);
    
  }


}
