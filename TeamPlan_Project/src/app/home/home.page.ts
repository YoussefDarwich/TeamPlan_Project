import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User,Project,Task,AppServicesService} from './../services/app-services.service'
import { Storage } from '@ionic/storage';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component'

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

  // taken from the ionic documentation to create a popover
  async presentPopover(ev: any) {
    
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true,
    });
    await popover.present();
    // popover.addEventListener('click',()=>{
    //   console.log("clickeddd");
    // });
    // popover.addEventListener('usernameOutput',($event)=>{
    //   console.log("Value from home" + $event);
    // })

    // popover.addEventListener(,()=>{
    //   console.log("test");
    // })

    return popover.onDidDismiss().then(
      (data: any) => {
        if (data) {
          console.log(data);
          // trigger here the method dependind on the popover response
        }
      });
  }

  ngOnInit(){

    setTimeout(()=>
      this.storage.get("username").then( (val)=>{
        this.username=val;

        this.getAllProjects(this.username);
      }),200);


  }

  getAllProjects(user:string){
    let jsonuser = {
      'username' : user
    }
    this.serv.getAllProjects(jsonuser).subscribe((response) => {
      this.projects=response;
      this.changeActiveProject(this.projects[0])

      this.getAllTasks(this.activeproj.id);
      this.getAllMembers(this.activeproj.id);

      
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
    this.storage.set('currentTask', currenttask)
    this.router.navigate(['task-info']);
  }


  changeActiveProject(project:Project){
    this.activeproj=project;
    this.setIsAssigned();
    this.getAllTasks(this.activeproj.id);
    this.getAllMembers(this.activeproj.id);

  }

  addMember(){

  }


  logOut(){
    this.storage.remove('username');
    this.storage.get("username").then((val)=>{
      console.log(val);
    });
    this.router.navigate(['signin']);
  }

  




}
