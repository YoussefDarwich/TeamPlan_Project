import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServicesService , User} from './../services/app-services.service'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {

  project_members:User[] = [];
  project_id:number = -1;

  constructor(private storage: Storage, private router:Router, private serv:AppServicesService) { }

  ngOnInit() {

    this.getProjectID();
  }

  onSubmit(taskInfo){
    let jsoninfo = {
        'project_id':this.project_id,
        'title' : taskInfo.value.Title,
        'assigned_username' : taskInfo.value.AssignedTo,
        'due_date' : taskInfo.value.DueDate,
        'description' : taskInfo.value.Description
    }

      this.serv.addTask(jsoninfo).subscribe(res=>{ 
        console.log(res);
        this.router.navigate(['home']);
    });

  }

  getProjectID(){
    this.storage.get("project_id").then( (val)=>{
      this.project_id=val;
      this.getProjectMembers();
    });
  }

  getProjectMembers(){
    let jsonproject = {
      'project_id' : this.project_id
    }
    this.serv.getAllMembers(jsonproject).subscribe((response) => {
      this.project_members=response;
    });
  }

}
