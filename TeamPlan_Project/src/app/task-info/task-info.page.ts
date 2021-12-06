import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Task } from './../services/app-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.page.html',
  styleUrls: ['./task-info.page.scss'],
})
export class TaskInfoPage implements OnInit {

  currentTask:Task={'title': "", 'project_id' : 0 , 'id' : 0 , 'due_date': "" , 'description' : "",'completed':0, 'assigned_username': ""};
  isAssignedUser:boolean=false;
  isCompleted:boolean=false;

  constructor(private router:Router, private storage:Storage ) {

   }

  ngOnInit() {

    this.getCurrentTask();

  }

  getCurrentTask(){
    
    this.storage.get("currentTask").then( (val)=>{
      this.currentTask=val;
      this.setIsAssigned();
      this.setIsCompleted();

  });

}

  setIsAssigned(){
    this.storage.get("username").then((val)=>{
      if(val==this.currentTask.assigned_username){
        this.isAssignedUser=true;
      }
      else{
        this.isAssignedUser=false;
      }
    });
  }

  setIsCompleted(){
    if(this.currentTask.completed==1){
      this.isCompleted=true;
    }
    else{
      this.isCompleted=false;
    }
  }
  onSubmit(file){
    console.log(file.value.file_upload);
    const url = file.value.file_upload;

    
  }


}
