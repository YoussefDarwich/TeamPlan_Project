import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Task } from './../services/app-services.service'

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.page.html',
  styleUrls: ['./task-info.page.scss'],
})
export class TaskInfoPage implements OnInit {

  currentTask:Task={'title': "", 'project_id' : 0 , 'id' : 0 , 'due_date': "" , 'description' : "bba",'completed':0, 'assigned_username': ""};

  constructor(private storage:Storage) { }

  ngOnInit() {

    this.getCurrentTask();
  }

  getCurrentTask(){
    
    this.storage.get("currentTask").then( (val)=>{
      this.currentTask=val;
  });
  
}

}
