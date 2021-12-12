import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User,Project,Task,AppServicesService} from './../services/app-services.service'
import { Storage } from '@ionic/storage';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component'
import { identity } from 'rxjs';

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
  activeproj:Project = {id : -1 , admin_username : "" , title : ""};
  isAssignedUser:boolean=false;

  colors:string[]=["memBlue","memYellow","memGreen","memRed"];
  colorIndex=0;



  constructor(private  popoverController: PopoverController , private storage:Storage,private router: Router, private serv : AppServicesService) {
  }

  ngOnInit(){

    setTimeout(()=>
      this.storage.get("username").then( (val)=>{
        this.username=val;

        this.getAllProjects(this.username);
      }),300);
  }

    // taken from the ionic documentation to create a popover
    async memberPopover(ev: any) {
    
      const popover = await this.popoverController.create({
        component: PopoverComponent,
        componentProps:{
          field:"Username",
          type:"Member"
        },
        event: ev,
        translucent: true,
      });
      await popover.present();
  
      return popover.onDidDismiss().then(
        (data: any) => {
          if (data) {
            if(data.data!=null)
              this.addMember(data.data.data);
          }
        });
    }
  
    async projectPopover(ev: any) {
      
      const popover = await this.popoverController.create({
        component: PopoverComponent,
        componentProps:{
          field:"Title",
          type:"Project"
        },
        event: ev,
        translucent: true,
      });
      await popover.present();
  
      return popover.onDidDismiss().then(
        (data: any) => {
          if (data) {
            if(data.data!=null)
              this.addProject(data.data.data);
          }
        });
    }

  getAllProjects(user:string){
    let jsonuser = {
      'username' : user
    }
    this.serv.getAllProjects(jsonuser).subscribe((response) => {
      this.projects=response;
      if(this.projects.length!=0){
        this.changeActiveProject(this.projects[0])

        this.getAllTasks(this.activeproj.id);
        this.getAllMembers(this.activeproj.id);
      }

      
    });

  }

  getAllTasks(project_id:number){
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let jsonproject = {
      'project_id' : project_id
    }
    this.serv.getAllCards(jsonproject).subscribe((response) => {
      this.tasks=response;

      // for(let task of this.tasks){
      //   if(Date.parse(task.due_date) < Date.parse(date)){
      //     task.completed=-1;
      //   }
      // }
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

  addMember(username:string){

    let jsoninfo = {
      'username':username,
      'project_id':this.activeproj.id
    };

    this.serv.addMember(jsoninfo).subscribe(res=>{ 
        this.getAllMembers(this.activeproj.id);
      });
    }

  addProject(project_title:string){

      let jsoninfo = {
        'username':this.username,
        'title':project_title
      };
  
      this.serv.addProject(jsoninfo).subscribe(res=>{ 
          this.getAllProjects(this.username);
        });
      }

  getNameFromUsername(username:string){
    for(let mem of this.members){

      if(mem.username==username){
        return mem.full_name;
      }
    }
  }

  setIsAssigned(){
    this.storage.get("username").then((val)=>{
      if(val==this.activeproj.admin_username){
        this.isAssignedUser=true;
      }
      else{
        this.isAssignedUser=false;
      }
    });
  }

  addTaskRedirect(){
    this.storage.set('project_id',this.activeproj.id);
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
    this.storage.set('currentTask', currenttask);
    this.storage.set('currentProject', this.activeproj.admin_username);
    this.router.navigate(['task-info']);
  }


  changeActiveProject(project:Project){
    this.activeproj=project;
    this.setIsAssigned();
    this.getAllTasks(this.activeproj.id);
    this.getAllMembers(this.activeproj.id);

  }


  logOut(){
    this.storage.remove('username');
    this.storage.get("username").then((val)=>{
    });
    this.router.navigate(['signin']);
  }

  




}
