import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User,Project,Task,AppServicesService} from './../services/app-services.service'
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  projects:Project[]=[];
  tasks:Task[] = [];
  members:User[] = []

  username:string;
  activeproj:number;

  colors:string[]=["memBlue","memYellow","memGreen","memRed"];
  colorIndex=0;



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
      this.getAllMembers(this.activeproj);

      
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

  getAllMembers(project_id:number){
    let jsonproject = {
      'project_id' : project_id
    }
    this.serv.getAllMembers(jsonproject).subscribe((response) => {
      this.members=response;
    });
  }

  getNameFromUsername(username){
    for(let mem of this.members){
      if(mem.username==username){
        return mem.full_name;
      }
    }
  }

  addTaskRedirect(){

    this.router.navigate(['add-task']);
    
  }

  getColor(index){
    return this.colors[index];
  }

  taskInfoRedirect(task_id){
   var currenttask:Task;
    for(let task of this.tasks){
      if(task.id==task_id){
        currenttask= task;
      }
    }
    this.storage.set('currentTask', currenttask)
    this.router.navigate(['task-info']);
  }


  changeActiveProject(project_id:number){
    this.activeproj=project_id;
    this.getAllTasks(this.activeproj);

  }




}
