import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Task , AppServicesService } from './../services/app-services.service';
import { Router } from '@angular/router';
import {FileTransfer , FileTransferObject, FileUploadOptions} from '@ionic-native/file-transfer/ngx'

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.page.html',
  styleUrls: ['./task-info.page.scss'],
})
export class TaskInfoPage implements OnInit {

  currentTask:Task={'title': "", 'project_id' : 0 , 'id' : 0 , 'due_date': "" , 'description' : "",'completed':0, 'assigned_username': "",'link':""};
  currentProjectAdmin:string="";
  isAssignedUser:boolean=false;
  isCompleted:number=0;
  username:string;

  transferObject:FileTransferObject;
  

  constructor(private storage:Storage,private router: Router, private serv : AppServicesService) {

   }

  ngOnInit() {

    this.getCurrentTask();

  }

  getCurrentTask(){
    
    this.storage.get("currentTask").then( (val)=>{
      this.currentTask=val;
      this.getProjectAdmin();
  });

}

  getProjectAdmin(){
    this.storage.get("currentProject").then( (val)=>{
      this.currentProjectAdmin=val;
      this.setIsAssigned();
      this.setIsCompleted();
  });
  }

  setIsAssigned(){
    this.storage.get("username").then((val)=>{
      this.username =val;
      if(this.username==this.currentTask.assigned_username){
        this.isAssignedUser=true;
      }
      else{
        this.isAssignedUser=false;
      }
    });
  }

  setIsCompleted(){
    if(this.currentTask.completed==0){
      this.isCompleted=0;
    }
    else if(this.currentTask.completed==1){
      this.isCompleted=1;
    }
    else if(this.currentTask.completed==-1){
      this.isCompleted=-1
    }
  }
  onSubmit(file){
    const url = file.value.link_upload;

    let jsonlink ={
      'link' : url,
      'task_id' : this.currentTask.id
    }

    this.serv.uploadFile(jsonlink).subscribe(res=>{
      if(res['success_status'] == 'success'){
        this.router.navigate(['home']);
      }
      else{
        console.log("An error has occured.")

      }
    });
    
  }

  deleteTask(){
    let jsontask={
      'task_id':this.currentTask.id
    }
    this.serv.deleteTask(jsontask).subscribe(res=>{ 

      if(res['success_status'] == 'success'){
        this.router.navigate(['home']);
      }
      else{
        return "An error has occured";
      }
    });
  }


}
